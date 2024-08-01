import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { deleteQuiz } from '../../../../services/quizApiService'
import { toast } from 'react-toastify'

const ModalDeleteQuiz = (props) => {
    const {
        show,
        setShow,
        quizDelete,
        setQuizDelete,
        checkedQuiz,
        setCheckedQuiz,
        fetchQuizList
    } = props

    const handleCloseModal = () => {
        setShow(false)
        setQuizDelete({})
    }

    const handleDeleteQuiz = async () => {
        if (quizDelete && quizDelete.id) {
            const res = await deleteQuiz(quizDelete.id)

            if (res && res.EC === 0) {
                toast.success('Delete quiz successfully')
                handleCloseModal()
                await fetchQuizList()
            } else {
                toast.error(res.EM)
            }
        } else if (checkedQuiz && checkedQuiz.length > 0) {
            handleDeleteCheckedQuiz()
        } else {
            toast.error('Quiz not found')
        }
    }


    const handleDeleteCheckedQuiz = async () => {
        const deletePromises = checkedQuiz.map(id => deleteQuiz(id))
        const results = await Promise.all(deletePromises)

        if (results) {
            const failed = results.filter(res => res && res.EC !== 0)

            if (failed.length > 0) {
                toast.error(failed.map(item => item.EM).join(', '))
            } else {
                toast.success('Delete all checked quiz successfully')
                handleCloseModal()
                setCheckedQuiz([])
                await fetchQuizList()
            }
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                backdrop="static"
                className="quiz-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {quizDelete && quizDelete.name
                        ? (
                            <>Are you sure to delete quiz with name "<b>{quizDelete.name}</b>" ?</>
                        )
                        : (
                            <>Are you sure to delete all checked quizzes ?</>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteQuiz}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteQuiz