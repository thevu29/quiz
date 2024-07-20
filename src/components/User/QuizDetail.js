import { useState, useEffect, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getQuizDetailById, postSubmitQuiz } from '../../services/quizApiService'
import _ from 'lodash'
import './QuizDetail.scss'
import Question from './Question'
import ModalResult from './ModalResult'

const QuizDetail = (props) => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id
    const { quizTitle } = location?.state

    const [quizDetail, setQuizDetail] = useState([])
    const [index, setIndex] = useState(0)
    const [showModalResult, setShowModalResult] = useState(false)
    const [results, setResults] = useState(null)
    const [isShowResult, setIsShowResult] = useState(false)

    useEffect(() => {
        document.title = 'Quiz'
    }, [])

    const fetchQuizDetail = useCallback(async () => {
        const res = await getQuizDetailById(quizId)
        if (res && res.EC === 0) {
            const data = _.chain(res.DT)
                .groupBy('id')
                .map((value, key) => {
                    const questionId = key
                    const question = value[0].description
                    const image = value[0].image
                    const answers = value.map(item => ({ id: item.answers.id, answer: item.answers.description, isSelected: false }))
                    return { questionId, question, image, answers }
                })
                .value()

            setQuizDetail(data)
        }

    }, [quizId])

    useEffect(() => {
        fetchQuizDetail()
    }, [fetchQuizDetail])

    const handleChooseAnswer = (questionId, answerId) => {
        let quizDetailClone = _.cloneDeep(quizDetail)
        let question = quizDetailClone.find(item => +item.questionId === +questionId)

        if (question && question.answers && question.answers.length > 0) {
            const answers = question.answers.map(item => {
                item.isSelected = +item.id === +answerId ? true : false
                return item
            })

            question.answers = answers
            const index = quizDetailClone.findIndex(item => +item.questionId === +questionId)

            if (index !== -1) {
                quizDetailClone[index] = question
                setQuizDetail(quizDetailClone)
            }
        }
    }

    const handleSubmiQuiz = async () => {
        if (quizDetail && quizDetail.length > 0) {
            const payload = {
                quizId: +quizId,
                answers: quizDetail.map(item => (
                    {
                        questionId: +item.questionId,
                        userAnswerId: item.answers.find(answer => answer.isSelected)
                            ? [item.answers.find(answer => answer.isSelected)?.id]
                            : []
                    }
                ))
            }

            const res = await postSubmitQuiz(payload)
            console.log(res)
            if (res && res.EC === 0) {
                setResults(res.DT)
                setShowModalResult(true)
            }
        }
    }

    const handleResetQuiz = () => {
        let quizDetailClone = _.cloneDeep(quizDetail)
        quizDetailClone.forEach(item => {
            item.answers.forEach(answer => {
                answer.isSelected = false
            })
        })
        setQuizDetail(quizDetailClone)
    }

    return (
        <div className="quiz-detail-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="quiz-detail">
                            <h2 className="quiz-detail-title">{quizTitle}</h2>
                            <div className="quiz-detail-body">
                                <div className="quiz-detail-guide">
                                    Read each question and choose the best answer:
                                </div>

                                <Question
                                    question={quizDetail && quizDetail.length > 0 ? quizDetail[index] : {}}
                                    index={index}
                                    handleChooseAnswer={handleChooseAnswer}
                                    results={results}
                                    isShowResult={isShowResult}
                                />

                                <div className="d-flex align-items-center justify-content-center mt-5">
                                    {index > 0 && (
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => setIndex(index - 1)}
                                        >
                                            Back
                                        </button>
                                    )}
                                    {index < quizDetail.length - 1 && (
                                        <button
                                            className="btn btn-outline-dark ms-3"
                                            onClick={() => setIndex(index + 1)}
                                        >
                                            Next
                                        </button>
                                    )}
                                    {!results && (
                                        <button
                                            className="btn btn-primary ms-3"
                                            onClick={handleSubmiQuiz}
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">

                    </div>
                </div>
            </div>

            <ModalResult
                showModalResult={showModalResult}
                setShowModalResult={setShowModalResult}
                results={results}
                setIsShowResult={setIsShowResult}
                handleResetQuiz={handleResetQuiz}
            />
        </div>
    )
}

export default QuizDetail