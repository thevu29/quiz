import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { TiTimes } from 'react-icons/ti'
import { CiCircleCheck, CiCircleMinus } from "react-icons/ci"
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { postUpsertQA } from '../../../../services/quizApiService'
import { FileToBase64 } from '../../../../utils/Convert'

const ModalUpdateQuestion = (props) => {
    const {
        show,
        setShow,
        questionList,
        questionUpdate,
        setQuestionUpdate,
        quizId,
        fetchQuestionByQuiz
    } = props

    const INIT_ANSWER = {
        id: uuidv4(),
        description: '',
        isCorrect: false
    }

    const [description, setDescription] = useState('')
    const [questionImage, setQuestionImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [answers, setAnswers] = useState([INIT_ANSWER])

    useEffect(() => {
        if (!_.isEmpty(questionUpdate)) {
            setDescription(questionUpdate.description)
            setAnswers(questionUpdate.answers)
            questionUpdate.imageFile
                ? setPreviewImage(`data:image/jpeg;base64,${questionUpdate.imageFile}`)
                : setPreviewImage(null)
        }
    }, [questionUpdate])

    const handleCloseModal = () => {
        setDescription('')
        setQuestionImage(null)
        setPreviewImage(null)
        setShow(false)
        setAnswers([INIT_ANSWER])
        setQuestionUpdate({})
    }

    const handleUploadImage = e => {
        if (e.target && e.target.files && e.target.files[0]) {
            const validImage = ['image/jpeg', 'image/png', 'image/jpg']

            if (!validImage.includes(e.target.files[0].type)) {
                alert('File is not an image')
                return
            }

            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setQuestionImage(e.target.files[0])
        }
    }

    const handleRemovePreviewImage = () => {
        setPreviewImage(null)
        setQuestionImage(null)
    }

    const handleUpdateQuestion = async () => {
        if (!description) {
            toast.error('Please enter question description')
            return
        }
        if (!answers || answers.length < 3) {
            toast.error('At least 3 answers are required')
            return
        }
        if (answers.some(answer => answer.description === '')) {
            toast.error('Answers must not be empty')
            return
        }
        if (answers.filter(answer => answer.isCorrect).length < 1) {
            toast.error('Correct answer is required')
            return
        }

        let questionClone = _.cloneDeep(questionUpdate)
        questionClone.description = description
        questionClone.answers = answers
        questionClone.imageFile = questionImage

        if (questionClone.imageFile) {
            questionClone.imageFile = await FileToBase64(questionClone.imageFile)
        }

        const payload = {
            quizId,
            questions: [...questionList.filter(question => question.id !== questionUpdate.id), questionClone]
        }

        const res = await postUpsertQA(payload)

        if (res && res.EC === 0) {
            toast.success('Update question successfully')
            await fetchQuestionByQuiz(quizId)
            handleCloseModal()
        } else {
            toast.error(res.EM)
        }
    }

    const handleAddRemoveAnswer = (type, id) => {
        if (type === 'add') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            setAnswers([...answers, newAnswer])
        } else if (type === 'remove') {
            const answersClone = _.cloneDeep(answers)
            setAnswers(answersClone.filter(answer => answer.id !== id))
        }
    }

    const handleOnChangeAnswer = (id, value) => {
        let answerClone = _.cloneDeep(answers)
        const index = answerClone.findIndex(answer => answer.id === id)

        if (index > -1) {
            answerClone[index].description = value
            setAnswers(answerClone)
        }
    }

    const handleCheckCorrectAnswer = id => {
        let answerClone = _.cloneDeep(answers)
        answerClone = answerClone.map(answer => {
            answer.isCorrect = answer.id === id ? true : false
            return answer
        })

        const index = answerClone.findIndex(answer => answer.id === id)

        if (index > -1) {
            answerClone[index].isCorrect = true
            setAnswers(answerClone)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                backdrop="static"
                scrollable
                className="question-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12 d-flex justify-content-center align-items-center pb-2 border-bottom">
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
                            <div>
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
                        <div className="col-md-12">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={description}
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                                <label>Question description</label>
                            </div>
                            <div className="answer-container ps-3">
                                {answers && answers.length > 0 && (
                                    answers.map((answer, index) => (
                                        <div key={answer.id} className="d-flex align-items-center mb-2">
                                            <div>
                                                <input type="radio" name="answer" id="answer" className="form-check-input" hidden />
                                                <label
                                                    htmlFor="answer"
                                                    style={{ cursor: 'pointer' }}
                                                    title="Correct answer"
                                                    onClick={() => handleCheckCorrectAnswer(answer.id)}
                                                >
                                                    <CiCircleCheck
                                                        fontSize={28} color="#999191"
                                                        className={answer.isCorrect ? 'correct' : ''}
                                                    />
                                                </label>
                                            </div>
                                            <div className="form-floating w-100 mx-2">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={`Answer ${index + 1}`}
                                                    value={answer.description}
                                                    onChange={e => handleOnChangeAnswer(answer.id, e.target.value)}
                                                />
                                                <label>{`Answer ${index + 1}`}</label>
                                            </div>
                                            {answers.length > 1 && (
                                                <span onClick={() => handleAddRemoveAnswer('remove', answer.id)}>
                                                    <CiCircleMinus fontSize={28} color="#C70000" cursor='pointer' title="Delete answer" />
                                                </span>
                                            )}
                                        </div>
                                    ))
                                )}
                                <button
                                    className="btn btn-outline-secondary w-100 mt-2"
                                    type="button"
                                    onClick={() => handleAddRemoveAnswer('add', '')}
                                >
                                    Add answer
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateQuestion}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateQuestion