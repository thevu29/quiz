import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const QuizModal = (props) => {
    const {
        modalAction,
        showQuizModal,
        setShowQuizModal,
        results,
        setIsShowResult,
        handleResetQuiz,
        handleRedo
    } = props

    let score = 0
    if (results) {
        score = Math.round(+results.countCorrect / +results.countTotal * 10)
    }

    const handleClose = () => setShowQuizModal(false)

    const handleShowResult = () => {
        setShowQuizModal(false)
        handleResetQuiz()
        setIsShowResult(true)
    }

    return (
        <>
            <Modal
                show={showQuizModal}
                onHide={handleClose}
                className="quiz-result-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalAction && (() => {
                            switch (modalAction) {
                                case 'submit':
                                    return 'Result'
                                case 'redo':
                                    return 'Confirm redo'
                                case 'answer-all':
                                    return 'Answer all questions'
                                default:
                                    return ''
                            }
                        })()}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalAction && (() => {
                        switch (modalAction) {
                            case 'submit':
                                return (
                                    <>
                                        <div className="quiz-result-box">
                                            <span>Total questions</span>
                                            <span>{results?.countTotal}</span>
                                        </div>
                                        <div className="quiz-result-box">
                                            <span>Correct answer</span>
                                            <span>{results?.countCorrect}/{results?.countTotal}</span>
                                        </div>
                                        <div className="quiz-result-box">
                                            <span>Score</span>
                                            <span style={{ color: 'red' }}>{score}</span>
                                        </div>
                                    </>
                                )
                            case 'redo':
                                return 'Are you sure you want to redo the quiz?'
                            case 'answer-all':
                                return 'Please answer all questions before submitting!'
                            default:
                                return 'Action not found'
                        }
                    })()}
                </Modal.Body>
                <Modal.Footer>
                    {modalAction && (() => {
                        switch (modalAction) {
                            case 'redo':
                                return (
                                    <>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleRedo}>
                                            Redo
                                        </Button>
                                    </>
                                )
                            case 'submit':
                                return (
                                    <>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleShowResult}>
                                            Show result
                                        </Button>
                                    </>
                                )
                            case 'answer-all':
                                return (
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                )
                            default:
                                return ''
                        }
                    })()}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QuizModal