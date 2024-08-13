import './ManageQuiz.scss'
import { CiSearch } from 'react-icons/ci'
import { GoPlusCircle } from 'react-icons/go'
import { FiFilter } from 'react-icons/fi'
import { TbTrashX } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import { getAllQuizzes } from '../../../../services/quizApiService'
import { Scrollbar } from 'react-scrollbars-custom'
import { MdOutlineAssignment } from 'react-icons/md'
import ModalAddQuiz from './ModalAddQuiz'
import QuizTable from './QuizTable'
import ModalUpdateQuiz from './ModalUpdateQuiz'
import ModalDeleteQuiz from './ModalDeleteQuiz'
import ModalAssignUser from './ModalAssignUser'

const ManageQuiz = (props) => {
    const [showModalAddQuiz, setShowModalAddQuiz] = useState(false)
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false)
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)
    const [showModalAssignUser, setShowModalAssignUser] = useState(false)

    const [quiz, setQuiz] = useState({})
    const [quizList, setQuizList] = useState([])

    const [isCheckAll, setIsCheckAll] = useState(false)
    const [checkedQuiz, setCheckedQuiz] = useState([])

    const fetchQuizList = async () => {
        const res = await getAllQuizzes()
        if (res && res.EC === 0) {
            setQuizList(res.DT)
        }
    }

    useEffect(() => {
        fetchQuizList()
    }, [])

    const handleCheckAllQuiz = () => {
        setIsCheckAll(!isCheckAll)
        setCheckedQuiz(quizList.map(quiz => +quiz.id))
        if (isCheckAll) {
            setCheckedQuiz([])
        }
    }

    const handleCheckQuiz = e => {
        const { id, checked } = e.target

        setCheckedQuiz([...checkedQuiz, +id])
        if (!checked) {
            setCheckedQuiz(checkedQuiz.filter(item => item !== +id))
        }
    }

    const handleShowModalUpdateQuiz = quiz => {
        setShowModalUpdateQuiz(true)
        setQuiz(quiz)
    }

    const handleShowModalDeleteQuiz = quiz => {
        setShowModalDeleteQuiz(true)
        setQuiz(quiz)
    }

    return (
        <div className="manage-quiz-container">
            <h2 className="header">MANAGE QUIZ</h2>
            <div className="manage-quiz-content">
                <div className="manage-quiz-filter__container">
                    <div className="search-quiz__container">
                        <CiSearch className="search-icon" />
                        <input type="text" placeholder="Search quiz" />
                    </div>
                    <div className="filter-role__container">
                        <select className="form-control">
                            <option>Select Diffculty</option>
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>
                    </div>
                    <div className="filter-button__container">
                        <button className="btn btn-dark">
                            <FiFilter />
                            Filter
                        </button>
                    </div>
                </div>
                <div className="quiz-table__container">
                    <div className="mb-4 d-flex align-items-center justify-content-between">
                        <h5 className="mb-0">Quizzes</h5>
                        <div className="d-flex align-items-center">
                            {checkedQuiz && checkedQuiz.length > 0 && (
                                <button
                                    className="btn btn-danger me-2 d-flex align-items-center"
                                    style={{ gap: '6px', fontSize: '14px' }}
                                    onClick={() => setShowModalDeleteQuiz(true)}
                                >
                                    <TbTrashX fontSize={16} />
                                </button>
                            )}
                            <button
                                className="btn btn-warning d-flex align-items-center me-3"
                                style={{ gap: '6px', fontSize: '14px' }}
                                onClick={() => setShowModalAssignUser(true)}
                            >
                                <MdOutlineAssignment fontSize={16} />
                                Assign To User
                            </button>
                            <button
                                className="btn btn-primary d-flex align-items-center"
                                style={{ gap: '6px', fontSize: '14px' }}
                                onClick={() => setShowModalAddQuiz(true)}
                            >
                                <GoPlusCircle fontSize={16} />
                                Add Quiz
                            </button>
                        </div>
                    </div>
                    <Scrollbar style={{ height: 350 }}>
                        <QuizTable
                            quizList={quizList}
                            isCheckAll={isCheckAll}
                            handleCheckAllQuiz={handleCheckAllQuiz}
                            handleCheckQuiz={handleCheckQuiz}
                            checkedQuiz={checkedQuiz}
                            handleShowModalUpdateQuiz={handleShowModalUpdateQuiz}
                            handleShowModalDeleteQuiz={handleShowModalDeleteQuiz}
                        />
                    </Scrollbar>
                </div>

                <ModalAddQuiz
                    show={showModalAddQuiz}
                    setShow={setShowModalAddQuiz}
                    fetchQuizList={fetchQuizList}
                />

                <ModalUpdateQuiz
                    show={showModalUpdateQuiz}
                    setShow={setShowModalUpdateQuiz}
                    quizUpdate={quiz}
                    setQuizUpdate={setQuiz}
                    fetchQuizList={fetchQuizList}
                />

                <ModalDeleteQuiz
                    show={showModalDeleteQuiz}
                    setShow={setShowModalDeleteQuiz}
                    quizDelete={quiz}
                    setQuizDelete={setQuiz}
                    checkedQuiz={checkedQuiz}
                    setCheckedQuiz={setCheckedQuiz}
                    fetchQuizList={fetchQuizList}
                />

                <ModalAssignUser 
                    show={showModalAssignUser}
                    setShow={setShowModalAssignUser}
                    quizzes={quizList}
                />
            </div>
        </div>
    )
}

export default ManageQuiz