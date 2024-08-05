import { useEffect, useState } from 'react'
import { getALlUsers } from '../../../../services/userApiService'
import { postAssignQuiz } from '../../../../services/quizApiService'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const ModalAssignUser = (props) => {
    const { show, setShow, quizzes } = props
    const animatedComponents = makeAnimated()

    const [selectedQuizzes, setSelectedQuizzes] = useState([])
    const [quizList, setQuizList] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [userList, setUserList] = useState([])

    const handleClose = () => {
        setShow(false)
        setSelectedQuizzes([])
        setSelectedUsers([])
    }

    const fetchAllUsers = async () => {
        const res = await getALlUsers()
        if (res && res.EC === 0) {
            setUserList(res.DT.map(user => ({ value: user.id, label: user.email })))
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    useEffect(() => {
        setQuizList(quizzes.map(quiz => ({ value: quiz.id, label: quiz.name })))
    }, [quizzes])

    const handleAssignQuiz = async () => {
        const quizIds = selectedQuizzes.map(quiz => quiz.value)
        const userIds = selectedUsers.map(user => user.value)
        let promises = []

        for (const quizId of quizIds) {
            for (const userId of userIds) {
                promises.push(postAssignQuiz(quizId, userId))
            }
        }

        const res = await Promise.all(promises)
        if (res && res.every(item => item.EC === 0)) {
            toast.success('Assign quiz to user successfully')
            handleClose()
        } else {
            toast.error(res.filter(item => item.EC !== 0).map(item => item.EM).join(', '))
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Assign Quiz To User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Select
                        defaultValue={selectedQuizzes}
                        options={quizList}
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        isMulti
                        placeholder="Select Quiz"
                        onChange={e => setSelectedQuizzes(e)}
                    />

                    <Select
                        defaultValue={selectedUsers}
                        options={userList}
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        isMulti
                        placeholder="Select User"
                        className="mt-3"
                        onChange={e => setSelectedUsers(e)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAssignQuiz}>
                        Assign
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAssignUser