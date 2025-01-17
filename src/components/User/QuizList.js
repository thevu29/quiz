import { useEffect, useState } from 'react'
import { getQuizByUser } from '../../services/quizApiService'
import './QuizList.scss'
import { useNavigate } from 'react-router-dom'

const QuizList = (props) => {
    const [quizList, setQuizList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Quiz'
        fetchQuizList()
    }, [])

    const fetchQuizList = async () => {
        const res = await getQuizByUser()
        if (res && res.EC === 0) {
            setQuizList(res.DT)
        }
    }

    return (
        <div className="quiz-list-container">
            <div className="container">
                <div className="row">
                    {quizList && quizList.length > 0 &&
                        quizList.map((quiz, index) => {
                            return (
                                <div key={`quiz-${quiz.id}`} className="col-6 col-xl-2 col-lg-3 col-md-4">
                                    <div className="quiz-item">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img className="quiz-item-img" src={`data:image/jpeg;base64,${quiz.image}`} alt="" />
                                        </div>

                                        <div className="quiz-item-body">
                                            <h5 className="quiz-item-title">Quiz {index + 1}</h5>
                                            <p className="quiz-item-text">{quiz.description}</p>
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                                            >
                                                Start now</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {quizList && quizList.length === 0 &&
                        <h1 className="text-center">
                            You don't have any quiz
                        </h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default QuizList