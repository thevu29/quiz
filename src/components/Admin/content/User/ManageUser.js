import { CiSearch } from 'react-icons/ci'
import { GoPlusCircle } from 'react-icons/go'
import { FiFilter } from 'react-icons/fi'
import { TbTrashX } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './ManageUser.scss'
import { getALlUsers, getPaginateUsers } from '../../../../services/userApiService'
import ModalAddUser from './ModalAddUser'
import UserTable from './UserTable'
import ModalUpdateUser from './ModalUpdateUser'
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser'

const ManageUser = (props) => {
    const LIMIT_USER = 6
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [user, setUser] = useState({})
    const [userList, setUserList] = useState([])

    const [showModalAddUser, setShowModalAddUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [isCheckAll, setIsCheckAll] = useState(false)
    const [checkedUser, setCheckedUser] = useState([])

    useEffect(() => {
        fetchPaginateUser(1)
    }, [])

    const fetchUserList = async () => {
        const res = await getALlUsers()
        if (res && res.EC === 0) {
            setUserList(res.DT)
        }
    }

    const fetchPaginateUser = async page => {
        const res = await getPaginateUsers(page, LIMIT_USER)
        if (res && res.EC === 0) {
            setUserList(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

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

    const handleCheckAllUser = () => {
        setIsCheckAll(!isCheckAll)
        setCheckedUser(userList
            .filter(user => user.id !== 1 && user.id !== 2)
            .map(user => +user.id)
        )
        if (isCheckAll) {
            setCheckedUser([])
        }
    }

    const handleCheckUser = e => {
        const { id, checked } = e.target
        if (+id === 1 || +id === 2) {
            toast.warning('You can not delete this user')
            return
        }

        setCheckedUser([...checkedUser, +id])
        if (!checked) {
            setCheckedUser(checkedUser.filter(item => item !== +id))
        }
    }

    return (
        <div className="manage-user-container">
            <h2 className="header">MANAGE USER</h2>
            <div className="manage-user-content">
                <div className="manage-user-filter__container">
                    <div className="search-user__container">
                        <CiSearch className="search-icon" />
                        <input type="text" placeholder="Search user" />
                    </div>
                    <div className="filter-role__container">
                        <select className="form-control">
                            <option>Select Role</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                        </select>
                    </div>
                    <div className="filter-button__container">
                        <button className="btn btn-dark">
                            <FiFilter />
                            Filter
                        </button>
                    </div>
                </div>
                <div className="user-table__container">
                    <div className="mb-4 d-flex align-items-center justify-content-between">
                        <h5 className="mb-0">Users</h5>
                        <div className="d-flex align-items-center">
                            {checkedUser && checkedUser.length > 0 && (
                                <button
                                    className="btn btn-danger me-2 d-flex align-items-center"
                                    style={{ gap: '6px', fontSize: '14px' }}
                                    onClick={() => setShowModalDeleteUser(true)}
                                >
                                    <TbTrashX fontSize={16} />
                                </button>
                            )}
                            <button
                                className="btn btn-primary d-flex align-items-center"
                                style={{ gap: '6px', fontSize: '14px' }}
                                onClick={() => setShowModalAddUser(true)}
                            >
                                <GoPlusCircle fontSize={16} />
                                Add User
                            </button>
                        </div>
                    </div>
                    <UserTable
                        userList={userList}
                        handleShowModalUpdateUser={handleShowModalUpdateUser}
                        handleShowModalViewUser={handleShowModalViewUser}
                        handleShowModalDeleteUser={handleShowModalDeleteUser}
                        isCheckAll={isCheckAll}
                        checkedUser={checkedUser}
                        handleCheckAllUser={handleCheckAllUser}
                        handleCheckUser={handleCheckUser}
                        fetchPaginateUser={fetchPaginateUser}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <ModalAddUser
                    show={showModalAddUser}
                    setShow={setShowModalAddUser}
                    fetchUserList={fetchUserList}
                    fetchPaginateUser={fetchPaginateUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    fetchUserList={fetchUserList}
                    fetchPaginateUser={fetchPaginateUser}
                    userUpdate={user}
                    setUserUpdate={setUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
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
                    fetchUserList={fetchUserList}
                    fetchPaginateUser={fetchPaginateUser}
                    userDelete={user}
                    setUserDelete={setUser}
                    checkedUser={checkedUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser