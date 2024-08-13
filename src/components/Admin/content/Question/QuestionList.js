import Accordion from 'react-bootstrap/Accordion'
import { FaCircleCheck, FaPenToSquare } from 'react-icons/fa6'

const QuestionList = (props) => {
    const {
        questionList,
        checkedQuestion,
        handleCheckQuestion,
        handleOpenModalUpdateQuestion
    } = props

    return (
        <div className="question-list">
            {questionList && questionList.length > 0 &&
                questionList.map((question, questionIndex) => (
                    <Accordion key={question.id} defaultActiveKey="0" flush>
                        <div className="question-item">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={question.id}
                                checked={checkedQuestion.includes(question.id)}
                                onChange={handleCheckQuestion}
                            />
                            <Accordion.Item eventKey={questionIndex}>
                                <Accordion.Header><b>Question {questionIndex + 1}:</b>&nbsp;{question.description}</Accordion.Header>
                                <Accordion.Body>
                                    <div className="answer-list">
                                        {question.answers && question.answers.length > 0 &&
                                            question.answers.map((answer, answerIndex) => (
                                                <div key={answer.id} className="answer-item">
                                                    <span>{String.fromCharCode(65 + answerIndex)}. {answer.description}</span>
                                                    {answer.isCorrect && <FaCircleCheck color="#0d6efd" title="Correct Answer" />}
                                                </div>
                                            ))
                                        }
                                        {question.answers && question.answers.length === 0 && <div>This question has no answer yet</div>}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <button
                                className="btn btn-warning btn-update"
                                title="Update question"
                                onClick={() => handleOpenModalUpdateQuestion(question)}
                            >
                                <FaPenToSquare fontSize={14} color="#fff" />
                            </button>
                        </div>
                    </Accordion>
                ))
            }
            {questionList && questionList.length === 0 && <div className="text-center fs-5">This quiz has no question yet</div>}
        </div>
    )
}

export default QuestionList