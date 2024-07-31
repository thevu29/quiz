import './ManageQuiz.scss'
import { CiSearch } from 'react-icons/ci'
import { GoPlusCircle } from 'react-icons/go'
import { FiFilter } from 'react-icons/fi'
import { TbTrashX } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import { getAllQuizzes } from '../../../../services/quizApiService'
import ModalAddQuiz from './ModalAddQuiz'
import QuizTable from './QuizTable'
import { Scrollbar } from 'react-scrollbars-custom'

const ManageQuiz = (props) => {
    const [showModalAddQuiz, setShowModalAddQuiz] = useState(false)

    const [quizList, setQuizList] = useState([])

    const fetchQuizList = async () => {
        const res = await getAllQuizzes()
        if (res && res.EC === 0) {
            setQuizList(res.DT)
        }
    }

    useEffect(() => {
        fetchQuizList()
    }, [])

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
                            {/* {checkedQuiz && checkedQuiz.length > 0 && (
                                <button
                                    className="btn btn-danger me-2 d-flex align-items-center"
                                    style={{ gap: '6px', fontSize: '14px' }}
                                    onClick={() => setShowModalDeleteQuiz(true)}
                                >
                                    <TbTrashX fontSize={16} />
                                </button>
                            )} */}
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
                        />
                    </Scrollbar>
                </div>

                <ModalAddQuiz
                    show={showModalAddQuiz}
                    setShow={setShowModalAddQuiz}
                />
            </div>
        </div>
    )
}

export default ManageQuiz