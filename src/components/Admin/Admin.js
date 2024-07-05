import SideBar from './Sidebar'
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="admin-container">
            <SideBar
                collapsed={collapsed}
            />

            <div className="admin-content">
                <div className="content-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} cursor={'pointer'} />
                </div>
                <div className="content-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin