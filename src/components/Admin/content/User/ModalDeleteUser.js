import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { deleteUser } from '../../../../services/userApiService'
import { toast } from 'react-toastify'

const ModalDeleteUser = (props) => {
    const {
        show,
        setShow,
        fetchPaginateUser,
        userDelete,
        setUserDelete,
        checkedUser,
        setCurrentPage
    } = props

    const handleCloseModal = () => {
        setShow(false)
        setUserDelete({})
    }

    const handleDeleteUser = async () => {
        if (userDelete && userDelete.id) {
            const res = await deleteUser(userDelete.id)

            if (res && res.EC === 0) {
                toast.success('Delete user successfully')
                handleCloseModal()
                setCurrentPage(1)
                await fetchPaginateUser(1)
            } else {
                toast.error(res.EM)
            }
        } else if (checkedUser && checkedUser.length > 0) {
            handleDeleteCheckedUser()
        } else {
            toast.error('User not found')
        }
    }


    const handleDeleteCheckedUser = async () => {
        const deletePromises = checkedUser.map(id => deleteUser(id))
        const results = await Promise.all(deletePromises)

        if (results) {
            const failed = results.filter(res => res && res.EC !== 0)

            if (failed.length > 0) {
                toast.error(failed.map(item => item.EM).join(', '))
            } else {
                toast.success('Delete all checked user successfully')
                handleCloseModal()
                setCurrentPage(1)
                await fetchPaginateUser(1)
            }
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                backdrop="static"
                className="user-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userDelete && userDelete.email
                        ? (
                            <>Are you sure to delete user with email "<b>{userDelete.email}</b>" ?</>
                        )
                        : (
                            <>Are you sure to delete all checked users ?</>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUser