import { useState, useEffect, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getQuizDetailById, postSubmitQuiz } from '../../services/quizApiService'
import { FaCheckCircle } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'
import _ from 'lodash'
import './QuizDetail.scss'
import Question from './Question'
import ModalResult from './QuizModal'
import CountDown from './CountDown'

const QuizDetail = (props) => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id
    const { quizTitle } = location?.state

    const [quizDetail, setQuizDetail] = useState([])
    const [quizIndex, setQuizIndex] = useState(0)
    const [showQuizModal, setShowQuizModal] = useState(false)
    const [results, setResults] = useState(null)
    const [isShowResult, setIsShowResult] = useState(false)
    const [modalAction, setModalAction] = useState('')
    const [isRedo, setIsRedo] = useState(false)

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

    const handleSubmitQuiz = async () => {
        if (quizDetail && quizDetail.length > 0) {
            const isAnsweredAll = quizDetail.every(item => item.answers.find(answer => answer.isSelected))
            if (!isAnsweredAll) {
                handleShowRequireAnswerAll()
                return
            }

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

            if (res && res.EC === 0) {
                setResults(res.DT)
                setModalAction('submit')
                setShowQuizModal(true)
            }
        }
    }

    const handleShowRequireAnswerAll = () => {
        setModalAction('answer-all')
        setShowQuizModal(true)
    }

    const handleResetQuiz = () => {
        let quizDetailClone = _.cloneDeep(quizDetail)
        quizDetailClone.forEach(item => {
            item.answers.forEach(answer => answer.isSelected = false)
        })
        setQuizDetail(quizDetailClone)
    }

    const handleShowRedoModal = () => {
        setModalAction('redo')
        setShowQuizModal(true)
    }

    const handleRedo = () => {
        handleResetQuiz()
        setShowQuizModal(false)
        setQuizIndex(0)
        setResults(null)
        setIsShowResult(false)
        setIsRedo(true)
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
                                    question={quizDetail && quizDetail.length > 0 ? quizDetail[quizIndex] : {}}
                                    quizIndex={quizIndex}
                                    handleChooseAnswer={handleChooseAnswer}
                                    results={results}
                                    isShowResult={isShowResult}
                                />

                                <div className="d-flex align-items-center justify-content-center mt-5">
                                    {quizIndex > 0 && (
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => setQuizIndex(quizIndex - 1)}
                                        >
                                            Back
                                        </button>
                                    )}
                                    {quizIndex < quizDetail.length - 1 && (
                                        <button
                                            className="btn btn-outline-dark ms-3"
                                            onClick={() => setQuizIndex(quizIndex + 1)}
                                        >
                                            Next
                                        </button>
                                    )}
                                    {!results && (
                                        <button
                                            className="btn btn-primary ms-3"
                                            onClick={handleSubmitQuiz}
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="quiz-detail-question-list">
                            <div className="list-header">
                                {results
                                    ? (
                                        <>
                                            <div className="d-flex flex-column align-items-center">
                                                <FaCheckCircle fontSize={20} />
                                                <span>{results?.countCorrect}/{results?.countTotal}</span>
                                                <span>Result</span>
                                            </div>
                                        </>
                                    )
                                    : (
                                        <div className="d-flex flex-column align-items-center" onClick={handleSubmitQuiz}>
                                            <FaCheckCircle fontSize={20} />
                                            <span>Submit</span>
                                        </div>
                                    )
                                }

                                <CountDown
                                    handleSubmitQuiz={handleSubmitQuiz}
                                    results={results}
                                    isRedo={isRedo}
                                />

                                <div className="d-flex flex-column align-items-center" onClick={handleShowRedoModal}>
                                    <MdRefresh fontSize={22} />
                                    <span>Redo</span>
                                </div>
                            </div>
                            <div className="list-body row">
                                {quizDetail && quizDetail.length > 0 && quizDetail.map((item, index) => {
                                    let isCurrentQuestion = index === quizIndex ? 'active' : ''
                                    let isSelected = item.answers.find(answer => answer.isSelected) ? 'selected' : ''
                                    let correctClass = ''

                                    if (isShowResult && results && results.quizData.length > 0) {
                                        const { isCorrect } = results.quizData.find(data => data.questionId === +item.questionId)
                                        correctClass = isCorrect ? 'correct' : 'error'
                                        isCurrentQuestion = ''
                                        isSelected = ''
                                    }

                                    const classNames = [
                                        'list-item',
                                        'col-2',
                                        isCurrentQuestion,
                                        isSelected,
                                        correctClass
                                    ].filter(Boolean).join(' ')

                                    return (
                                        <div
                                            key={`question-${index + 1}`}
                                            className={classNames}
                                            onClick={() => setQuizIndex(index)}
                                        >
                                            <span>{index + 1}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalResult
                modalAction={modalAction}
                showQuizModal={showQuizModal}
                setShowQuizModal={setShowQuizModal}
                results={results}
                setIsShowResult={setIsShowResult}
                handleResetQuiz={handleResetQuiz}
                handleRedo={handleRedo}
            />
        </div>
    )
}

export default QuizDetail