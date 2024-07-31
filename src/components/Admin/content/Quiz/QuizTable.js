import { FaCircleInfo, FaTrash, FaPenToSquare } from 'react-icons/fa6'

const QuizTable = (props) => {
    const { quizList } = props

    return (
        <>
            <table className="table table-hover table-responsive text-center">
                <thead>
                    <tr style={{ backgroundColor: 'rgba(15, 17, 20, .03)' }}>
                        <th scope="col">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                // onChange={handleCheckAllUser}
                                // checked={isCheckAll}
                            />
                        </th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Diffculty</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quizList && quizList.length > 0 &&
                        quizList.map((quiz, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={quiz.id}
                                            // onChange={handleCheckUser}
                                            // checked={checkedUser.includes(user.id)}
                                        />
                                    </td>
                                    <td>{quiz.id}</td>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td>
                                        <span
                                            className="me-1"
                                            // onClick={() => handleShowModalViewUser(user)}
                                        >
                                            <FaCircleInfo color="#0d6efd" cursor="pointer" fontSize="18px" title="View" />
                                        </span>
                                        <span
                                            className="mx-1"
                                            // onClick={() => handleShowModalUpdateUser(user)}
                                        >
                                            <FaPenToSquare color="#ffc107" cursor="pointer" fontSize="18px" title="Update" />
                                        </span>
                                        <span
                                            className="ms-1"
                                            // onClick={() => handleShowModalDeleteUser(user)}
                                        >
                                            <FaTrash color="#dc3545" cursor="pointer" fontSize="16px" title="Delete" />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {quizList && quizList.length === 0 && <tr className="text-center fs-3"><td colSpan="6">No data</td></tr>}
                </tbody>
            </table>
        </>
    )
}

export default QuizTable