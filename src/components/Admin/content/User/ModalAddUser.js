import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { isValidEmail } from '../../../../validation/Validate'
import { postAddUser } from '../../../../services/userApiService'
import { TiTimes } from 'react-icons/ti'

const ModalAddUser = (props) => {
    const { show, setShow, fetchPaginateUser, setCurrentPage } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [userImage, setUserImage] = useState('')
    const [previewImage, setPreviewImage] = useState(null)

    const handleCloseModal = () => {
        setEmail('')
        setPassword('')
        setUsername('')
        setRole('USER')
        setUserImage('')
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
            setUserImage(e.target.files[0])
        }
    }

    const handleRemovePreviewImage = () => {
        setPreviewImage(null)
        setUserImage('')
    }

    const handleAddUser = async () => {
        if (!isValidEmail(email)) {
            toast.error('Invalid email')
            return
        }

        if (!password) {
            toast.error('Password is required')
            return
        }

        const res = await postAddUser(email, password, username, role, userImage)

        if (res && res.EC === 0) {
            toast.success('Add user successfully')
            handleCloseModal()
            setCurrentPage(1)
            await fetchPaginateUser(1)
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
                className="user-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-8">
                            <div className="row mb-3">
                                <label className="col-form-label col-sm-2">Email</label>
                                <div className="col-sm-10">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-form-label col-sm-2">Password</label>
                                <div className="col-sm-10">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-form-label col-sm-2">Username</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-form-label col-sm-2">Role</label>
                                <div className="col-sm-10">
                                    <select
                                        className="form-select"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                    >
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddUser}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddUser