import './ManageUser.scss'
import ModalAddUser from './ModalAddUser'
import { CiSearch } from 'react-icons/ci'
import { GoPlus } from 'react-icons/go'
import { useEffect, useState } from 'react'
import { getALlUsers } from '../../../services/userApiService'
import UserTable from './UserTable'
import ModalUpdateUser from './ModalUpdateUser'

const ManageUser = (props) => {
    const [userList, setUserList] = useState([])
    const [userUpdate, setUserUpdate] = useState({})

    const [showModalAddUser, setShowModalAddUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)

    const fetchAllUsers = async () => {
        const res = await getALlUsers()
        if (res && res.EC === 0) {
            setUserList(res.DT)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const handleShowModalUpdateUser = (user) => {
        setShowModalUpdateUser(true)
        setUserUpdate(user)
    }

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
                </div>
                <div className="user-table__container">
                    <UserTable 
                        userList={userList}
                        handleShowModalUpdateUser={handleShowModalUpdateUser}
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
                    userUpdate={userUpdate}
                    setUserUpdate={setUserUpdate}
                />
            </div>
        </div>
    )
}

export default ManageUser