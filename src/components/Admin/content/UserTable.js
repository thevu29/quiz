import { useEffect, useState } from 'react'
import { getALlUsers } from '../../../services/userApiService'
import { FaCircleInfo, FaTrash, FaPenToSquare } from 'react-icons/fa6'

const UserTable = (props) => {
    const [listUser, setListUser] = useState([])

    const fetchAllUsers = async () => {
        const res = await getALlUsers()
        if (res && res.EC === 0) {
            setListUser(res.DT)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <>
            <table className="table table-striped table-hover table-responsive">
                <caption>List of users</caption>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((user, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <span className="me-2">
                                            <FaCircleInfo color='#0d6efd' cursor='pointer' fontSize='20px' />
                                        </span>
                                        <span className="mx-2">
                                            <FaPenToSquare color='#ffc107' cursor='pointer' fontSize='20px' />
                                        </span>
                                        <span className="ms-2">
                                            <FaTrash color='#dc3545' cursor='pointer' fontSize='18px' />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0 && <tr className="text-center fs-3"><td colSpan="4">No data</td></tr>}
                </tbody>
            </table>
        </>
    )
}

export default UserTable