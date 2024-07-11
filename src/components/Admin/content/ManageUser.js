import { CiSearch } from 'react-icons/ci'
import { GoPlus } from 'react-icons/go'
import { HiMinus } from 'react-icons/hi2'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './ManageUser.scss'
import { getALlUsers } from '../../../services/userApiService'
import ModalAddUser from './ModalAddUser'
import UserTable from './UserTable'
import ModalUpdateUser from './ModalUpdateUser'
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser'

const ManageUser = (props) => {
    const [user, setUser] = useState({})
    const [userList, setUserList] = useState([])

    const [showModalAddUser, setShowModalAddUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [isCheckAll, setIsCheckAll] = useState(false)
    const [checkedUser, setCheckedUser] = useState([])

    const fetchAllUsers = async () => {
        const res = await getALlUsers()
        if (res && res.EC === 0) {
            setUserList(res.DT)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const handleShowModalUpdateUser = user => {
        setShowModalUpdateUser(true)
        setUser(user)
    }

    const handleShowModalViewUser = user => {
        setShowModalViewUser(true)
        setUser(user)
    }

    const handleShowModalDeleteUser = user => {
        setShowModalDeleteUser(true)
        setUser(user)
    }

    const handleCheckAllUser = e => {
        setIsCheckAll(!isCheckAll)
        setCheckedUser(userList
            .filter(user => user.id !== 1 && user.id !== 2)
            .map(user => Number(user.id))
        )
        if (isCheckAll) {
            setCheckedUser([])
        }
    }

    const handleCheckUser = e => {
        const { id, checked } = e.target
        if (id === '1' || id === '2') {
            toast.warning('You can not delete this user')
            return
        }

        setCheckedUser([...checkedUser, Number(id)])
        if (!checked) {
            setCheckedUser(checkedUser.filter(item => item !== Number(id)))
        }
    }

    const handleShowModalDeleteCheckedUser = () => {
        if (!checkedUser || checkedUser.length === 0) {
            toast.error('Please choose user to delete')
            return
        }
        setShowModalDeleteUser(true)
    }

    console.log(checkedUser)

    return (
        <div className="manage-user-container">
            <h2 className="header">Manage User</h2>
            <div className="manage-user-content">
                <div className="manage-user-action__container">
                    <div className="search-user__container">
                        <CiSearch className="search-icon" />
                        <input type="text" placeholder="Search user" />
                    </div>
                    <button className="btn btn-primary btn-add-user" onClick={() => setShowModalAddUser(true)}>
                        <GoPlus />
                        Add new user
                    </button>
                    <button className="btn btn-danger btn-add-user ms-2" onClick={handleShowModalDeleteCheckedUser}>
                        <HiMinus />
                        Delete user
                    </button>
                </div>
                <div className="user-table__container">
                    <UserTable
                        userList={userList}
                        handleShowModalUpdateUser={handleShowModalUpdateUser}
                        handleShowModalViewUser={handleShowModalViewUser}
                        handleShowModalDeleteUser={handleShowModalDeleteUser}
                        isCheckAll={isCheckAll}
                        checkedUser={checkedUser}
                        handleCheckAllUser={handleCheckAllUser}
                        handleCheckUser={handleCheckUser}
                    />
                </div>

                <ModalAddUser
                    show={showModalAddUser}
                    setShow={setShowModalAddUser}
                    fetchAllUsers={fetchAllUsers}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    fetchAllUsers={fetchAllUsers}
                    userUpdate={user}
                    setUserUpdate={setUser}
                />

                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    userView={user}
                    setUserView={setUser}
                />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    fetchAllUsers={fetchAllUsers}
                    userDelete={user}
                    setUserDelete={setUser}
                    checkedUser={checkedUser}
                />
            </div>
        </div>
    )
}

export default ManageUser