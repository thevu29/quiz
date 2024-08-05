import { CiSearch } from 'react-icons/ci'
import { GoPlusCircle } from 'react-icons/go'
import { TbTrashX } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { getAllQuizzes } from '../../../../services/quizApiService'
import { getQuestionByQuiz } from '../../../../services/questionApiService'
import './ManageQuestion.scss'
import QuestionList from './QuestionList'
import ModalAddQuestion from './ModalAddQuestion'
import Select from 'react-select'
import ModalUpdateQuestion from './ModalUpdateQuestion'
import ModalDeleteQuestion from './ModalDeleteQuestion'

const ManageQuestion = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState(null)
    const [quizList, setQuizList] = useState([])

    useEffect(() => {
        fetchQuizList()
    }, [])

    const fetchQuizList = async () => {
        const res = await getAllQuizzes()
        if (res && res.EC === 0) {
            const quizzes = res.DT.map(quiz => ({ value: quiz.id, label: quiz.name }))
            setQuizList(quizzes)
        }
    }

    const [showModalAddQuestion, setShowModalAddQuestion] = useState(false)
    const [showModalUpdateQuestion, setShowModalUpdateQuestion] = useState(false)
    const [showModalDeleteQuestion, setShowModalDeleteQuestion] = useState(false)

    const [question, setQuestion] = useState({})
    const [questionList, setQuestionList] = useState([])
    const [checkedQuestion, setCheckedQuestion] = useState([])

    const handleCheckQuestion = e => {
        const { id, checked } = e.target
        setCheckedQuestion([...checkedQuestion, +id])
        if (!checked) {
            setCheckedQuestion(checkedQuestion.filter(item => +item !== +id))
        }
    }

    const handleOpenModalUpdateQuestion = question => {
        setShowModalUpdateQuestion(true)
        setQuestion(question)
    }

    const fetchQuestionByQuiz = async quizId => {
        const res = await getQuestionByQuiz(quizId)
        if (res && res.EC === 0) {
            setQuestionList(res.DT.qa)
        }
    }

    const handleSelectQuiz = e => {
        setSelectedQuiz(e)
        fetchQuestionByQuiz(e.value)
    }

    return (
        <div className="manage-question-container">
            <h2 className="header">MANAGE QUESTION</h2>
            <div className="manage-question-content">
                <div className="manage-question-filter__container">
                    <div className="filter-role__container">
                        <Select
                            defaultValue={selectedQuiz}
                            options={quizList}
                            placeholder="Select Quiz"
                            onChange={handleSelectQuiz}
                        />
                    </div>
                    <div className="search-question__container">
                        <CiSearch className="search-icon" />
                        <input type="text" placeholder="Search question" />
                    </div>
                </div>
                <div className="question-list__container">
                    <div className="mb-4 d-flex align-items-center justify-content-between">
                        <h5 className="mb-0">Questions</h5>
                        <div className="d-flex align-items-center">
                            {checkedQuestion && checkedQuestion.length > 0 && (
                                <button
                                    className="btn btn-danger me-2 d-flex align-items-center"
                                    style={{ gap: '6px', fontSize: '14px' }}
                                    onClick={() => setShowModalDeleteQuestion(true)}
                                >
                                    <TbTrashX fontSize={16} />
                                </button>
                            )}
                            {selectedQuiz && (
                                <button
                                    className="btn btn-primary d-flex align-items-center"
                                    style={{ gap: '6px', fontSize: '14px' }}
                                    onClick={() => setShowModalAddQuestion(true)}
                                >
                                    <GoPlusCircle fontSize={16} />
                                    Add Question
                                </button>
                            )}
                        </div>
                    </div>
                    <Scrollbar style={{ height: 350 }}>
                        <QuestionList
                            questionList={questionList}
                            checkedQuestion={checkedQuestion}
                            handleCheckQuestion={handleCheckQuestion}
                            handleOpenModalUpdateQuestion={handleOpenModalUpdateQuestion}
                        />
                    </Scrollbar>
                </div>
            </div>

            <ModalAddQuestion
                show={showModalAddQuestion}
                setShow={setShowModalAddQuestion}
                quizId={selectedQuiz ? +selectedQuiz.value : null}
                fetchQuestionByQuiz={fetchQuestionByQuiz}
            />

            <ModalUpdateQuestion
                show={showModalUpdateQuestion}
                setShow={setShowModalUpdateQuestion}
                questionList={questionList}
                questionUpdate={question}
                setQuestionUpdate={setQuestion}
                quizId={selectedQuiz ? +selectedQuiz.value : null}
                fetchQuestionByQuiz={fetchQuestionByQuiz}
            />

            <ModalDeleteQuestion 
                show={showModalDeleteQuestion}
                setShow={setShowModalDeleteQuestion}
                quizId={selectedQuiz ? +selectedQuiz.value : null}
                questionList={questionList}
                checkedQuestion={checkedQuestion}
                setCheckedQuestion={setCheckedQuestion}
                fetchQuestionByQuiz={fetchQuestionByQuiz}
            />
        </div>
    )
}

export default ManageQuestion