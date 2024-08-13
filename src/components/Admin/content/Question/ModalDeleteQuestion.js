import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { postUpsertQA } from '../../../../services/quizApiService'
import { FileToBase64, UrlToFile } from '../../../../utils/Convert'

const ModalDeleteQuestion = (props) => {
    const {
        show,
        setShow,
        quizId,
        questionList,
        checkedQuestion,
        setCheckedQuestion,
        fetchQuestionByQuiz
    } = props

    const handleCloseModal = () => {
        setShow(false)
        setCheckedQuestion([])
    }

    const handleDeleteQuestion = async () => {
        let questions = questionList.filter(question => !checkedQuestion.includes(question.id))
        for (let question of questions) {
            if (question.imageFile) {
                question.imageFile = await UrlToFile(`data:image/png;base64,${question.imageFile}`, `Question-${question.id}.png`, 'image/png')
                question.imageFile = await FileToBase64(question.imageFile)
            }
        }

        const payload = { quizId, questions }
        const res = await postUpsertQA(payload)

        if (res && res.EC === 0) {
            toast.success('Delete all checked questions successfully')
            handleCloseModal()
            await fetchQuestionByQuiz(quizId)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                backdrop="static"
                className="question-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete all checked questions ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteQuestion}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteQuestion