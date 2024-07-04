import ModalAddUser from "./ModalAddUser"

const ManageUser = (props) => {
    return (
        <div classNameName="manage-user-container">
            <h2 classNameName="header">Manage User</h2>
            <div classNameName="manage-user-content">
                <div>
                    <button>Add</button>
                </div>
                <div classNameName="">
                    <ModalAddUser />
                </div>
            </div>
        </div>
    )
}

export default ManageUser