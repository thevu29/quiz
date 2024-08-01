import { useEffect, useState } from 'react'
import _ from 'lodash'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { TiTimes } from 'react-icons/ti'
import defaultImage from '../../../../assets/images/default_image.jpg'
import { putUpdateQuiz } from '../../../../services/quizApiService'

const ModalUpdateQuiz = (props) => {
    const {
        show,
        setShow,
        quizUpdate,
        setQuizUpdate,
        fetchQuizList
    } = props

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('EASY')
    const [quizImage, setQuizImage] = useState('')
    const [previewImage, setPreviewImage] = useState(null)

    const handleCloseModal = () => {
        setName('')
        setDescription('')
        setDifficulty('EASY')
        setQuizImage('')
        setPreviewImage(null)
        setShow(false)
        setQuizUpdate({})
    }

    useEffect(() => {
        if (!_.isEmpty(quizUpdate)) {
            setName(quizUpdate.name)
            setDescription(quizUpdate.description)
            setDifficulty(quizUpdate.difficulty)
            quizUpdate.image
                ? setPreviewImage(`data:image/jpeg;base64,${quizUpdate.image}`)
                : setPreviewImage(defaultImage)
        }
    }, [quizUpdate])

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

    const handleUpdateQuiz = async () => {
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

        const res = await putUpdateQuiz(quizUpdate.id, name, description, difficulty, quizImage)

        if (res && res.EC === 0) {
            toast.success('Update quiz successfully')
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
                    <Modal.Title>Update quiz</Modal.Title>
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
                                <label className="col-form-label col-sm-2">Description</label>
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
                                        value={difficulty}
                                        onChange={e => setDifficulty(e.target.value)}
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
                    <Button variant="primary" onClick={handleUpdateQuiz}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateQuiz