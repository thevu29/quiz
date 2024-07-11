import { FaCircleInfo, FaTrash, FaPenToSquare } from 'react-icons/fa6'
import ReactPaginate from 'react-paginate'

const UserTable = (props) => {
    const {
        userList,
        handleShowModalUpdateUser,
        handleShowModalViewUser,
        handleShowModalDeleteUser,
        isCheckAll,
        handleCheckAllUser,
        checkedUser,
        handleCheckUser,
        fetchPaginateUser,
        pageCount
    } = props

    const handlePageClick = e => {
        fetchPaginateUser(+e.selected + 1)
    }

    return (
        <>
            <table className="table table-hover table-responsive text-center">
                <thead>
                    <tr style={{ backgroundColor: 'rgba(15, 17, 20, .03)' }}>
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
                                            className="me-1"
                                            onClick={() => handleShowModalViewUser(user)}
                                        >
                                            <FaCircleInfo color="#0d6efd" cursor="pointer" fontSize="18px" title="View" />
                                        </span>
                                        <span
                                            className="mx-1"
                                            onClick={() => handleShowModalUpdateUser(user)}
                                        >
                                            <FaPenToSquare color="#ffc107" cursor="pointer" fontSize="18px" title="Update" />
                                        </span>
                                        <span
                                            className="ms-1"
                                            onClick={() => handleShowModalDeleteUser(user)}
                                        >
                                            <FaTrash color="#dc3545" cursor="pointer" fontSize="16px" title="Delete" />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {userList && userList.length === 0 && <tr className="text-center fs-3"><td colSpan="6">No data</td></tr>}
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <ReactPaginate
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    )
}

export default UserTable