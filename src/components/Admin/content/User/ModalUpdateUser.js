import { useEffect, useState } from 'react'
import _ from 'lodash'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { putUpdateUser } from '../../../../services/userApiService'
import { TiTimes } from 'react-icons/ti'
import defaultImage from '../../../../assets/images/default_image.jpg'

const ModalUpdateUser = (props) => {
    const {
        show,
        setShow,
        fetchPaginateUser,
        currentPage,
        userUpdate,
        setUserUpdate
    } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('........')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [userImage, setUserImage] = useState('')
    const [previewImage, setPreviewImage] = useState(null)

    const handleCloseModal = () => {
        setEmail('')
        setPassword('........')
        setUsername('')
        setRole('USER')
        setUserImage('')
        setPreviewImage(null)
        setShow(false)
        setUserUpdate({})
    }

    useEffect(() => {
        if (!_.isEmpty(userUpdate)) {
            setEmail(userUpdate.email)
            setUsername(userUpdate.username)
            setRole(userUpdate.role)
            userUpdate.image
                ? setPreviewImage(`data:image/jpeg;base64,${userUpdate.image}`)
                : setPreviewImage(null)
        }
    }, [userUpdate])

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

    const handleUpdateUser = async () => {
        const res = await putUpdateUser(userUpdate.id, username, role, userImage)

        if (res && res.EC === 0) {
            toast.success('Update user successfully')
            handleCloseModal()
            await fetchPaginateUser(currentPage)
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
                    <Modal.Title>Update user</Modal.Title>
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
                                        disabled
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
                                        disabled
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
                                    : <img src={defaultImage} alt="Preview" />
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
                    <Button variant="primary" onClick={handleUpdateUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateUser