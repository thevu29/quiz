import { useEffect, useState } from 'react'
import _ from 'lodash'
import Modal from 'react-bootstrap/Modal'
import defaultImage from '../../../assets/images/default_image.jpg'

const ModalViewUser = (props) => {
    const { show, setShow, userView, setUserView } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('........')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [previewImage, setPreviewImage] = useState(null)

    const handleCloseModal = () => {
        setEmail('')
        setPassword('........')
        setUsername('')
        setRole('USER')
        setPreviewImage(null)
        setShow(false)
        setUserView({})
    }

    useEffect(() => {
        if (!_.isEmpty(userView)) {
            setEmail(userView.email)
            setUsername(userView.username)
            setRole(userView.role)
            userView.image
                ? setPreviewImage(`data:image/jpeg;base64,${userView.image}`)
                : setPreviewImage(defaultImage)
        }
    }, [userView])

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
                    <Modal.Title>User Information</Modal.Title>
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
                                        disabled
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
                                        disabled
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
                                    ? <img src={previewImage} alt="Preview" />
                                    : <span>Preview Image</span>
                                }
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalViewUser