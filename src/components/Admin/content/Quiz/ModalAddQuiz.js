import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { postAddQuiz } from '../../../../services/quizApiService'
import { TiTimes } from 'react-icons/ti'

const ModalAddQuiz = (props) => {
    const { show, setShow, fetchQuizList } = props

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [diffculty, setDiffculty] = useState('EASY')
    const [quizImage, setQuizImage] = useState('')
    const [previewImage, setPreviewImage] = useState(null)

    const handleCloseModal = () => {
        setName('')
        setDescription('')
        setDiffculty('EASY')
        setQuizImage('')
        setPreviewImage(null)
        setShow(false)
    }

    const handleUploadImage = e => {
        if (e.target && e.target.files && e.target.files[0]) {
            const validImage = ['image/jpeg', 'image/png', 'image/jpg']

            if (!validImage.includes(e.target.files[0].type)) {
                alert('File is not an image')
                return
            }

            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setQuizImage(e.target.files[0])
        }
    }

    const handleRemovePreviewImage = () => {
        setPreviewImage(null)
        setQuizImage('')
    }

    const handleAddQuiz = async () => {
        if (!name) {
            toast.error('Name is required')
            return
        }
        if (!description) {
            toast.error('Description is required')
            return
        }
        if (!quizImage) {
            toast.error('Image is required')
            return
        }

        const res = await postAddQuiz(name, description, diffculty, quizImage)

        if (res && res.EC === 0) {
            toast.success('Add quiz successfully')
            handleCloseModal()
            await fetchQuizList()
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                size="lg"
                backdrop="static"
                className="quiz-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-8">
                            <div className="row mb-3">
                                <label className="col-form-label col-sm-2">Name</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-form-label col-sm-2">Desciption</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-form-label col-sm-2">Diffculty</label>
                                <div className="col-sm-10">
                                    <select
                                        className="form-select"
                                        value={diffculty}
                                        onChange={e => setDiffculty(e.target.value)}
                                    >
                                        <option value="EASY">Easy</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HARD">Hard</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center flex-column align-items-center">
                            <div className="img-preview">
                                {previewImage
                                    ? <>
                                        <img src={previewImage} alt="Preview" />
                                        <span className="remove-img-button" onClick={handleRemovePreviewImage}>
                                            <TiTimes />
                                        </span>
                                    </>
                                    : <span>Preview Image</span>
                                }
                            </div>
                            <div className="">
                                <label className="btn btn-outline-dark btn-upload" htmlFor="upload-image">
                                    Choose Image
                                </label>
                                <input
                                    type="file"
                                    id="upload-image"
                                    hidden
                                    onChange={e => handleUploadImage(e)}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddQuiz}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddQuiz