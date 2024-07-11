import { FaCircleInfo, FaTrash, FaPenToSquare } from 'react-icons/fa6'

const UserTable = (props) => {
    const {
        userList,
        handleShowModalUpdateUser,
        handleShowModalViewUser,
        handleShowModalDeleteUser,
        isCheckAll,
        handleCheckAllUser,
        checkedUser,
        handleCheckUser
    } = props

    return (
        <>
            <table className="table table-hover table-bordered table-responsive text-center">
                <thead>
                    <tr className="table-secondary">
                        <th scope="col">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                onChange={handleCheckAllUser}
                                checked={isCheckAll}
                            />
                        </th>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList && userList.length > 0 &&
                        userList.map((user, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={user.id}
                                            onChange={handleCheckUser}
                                            checked={checkedUser.includes(user.id)}
                                        />
                                    </td>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <span
                                            className="me-2"
                                            onClick={() => handleShowModalViewUser(user)}
                                        >
                                            <FaCircleInfo color="#0d6efd" cursor="pointer" fontSize="20px" title="View" />
                                        </span>
                                        <span
                                            className="mx-2"
                                            onClick={() => handleShowModalUpdateUser(user)}
                                        >
                                            <FaPenToSquare color="#ffc107" cursor="pointer" fontSize="20px" title="Update" />
                                        </span>
                                        <span
                                            className="ms-2"
                                            onClick={() => handleShowModalDeleteUser(user)}
                                        >
                                            <FaTrash color="#dc3545" cursor="pointer" fontSize="18px" title="Delete" />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {userList && userList.length === 0 && <tr className="text-center fs-3"><td colSpan="4">No data</td></tr>}
                </tbody>
            </table>
        </>
    )
}

export default UserTable