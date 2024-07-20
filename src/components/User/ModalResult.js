import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalResult = (props) => {
    const {
        showModalResult,
        setShowModalResult,
        results,
        setIsShowResult,
        handleResetQuiz
    } = props

    let score = 0
    if (results) {
        score = +results.countCorrect / +results.countTotal * 10
    }

    const handleClose = () => setShowModalResult(false)

    const handleShowResult = () => {
        setShowModalResult(false)
        handleResetQuiz()
        setIsShowResult(true)
    }

    return (
        <>
            <Modal
                show={showModalResult}
                onHide={handleClose}
                className="quiz-result-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleShowResult}>
                        Show result
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalResult