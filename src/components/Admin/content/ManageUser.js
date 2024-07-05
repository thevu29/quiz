import './ManageUser.scss'
import ModalAddUser from './ModalAddUser'
import { CiSearch } from 'react-icons/ci'
import { GoPlus } from 'react-icons/go'
import { useState } from 'react'

const ManageUser = (props) => {
    const [showModalAddUser, setShowModalAddUser] = useState(false)

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
                    User Table
                </div>

                <ModalAddUser
                    show={showModalAddUser} 
                    setShow={setShowModalAddUser}
                />
            </div>
        </div>
    )
}

export default ManageUser