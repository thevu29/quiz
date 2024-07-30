import SideBar from './Sidebar'
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postLogout } from '../../services/authApiService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../../redux/action/userAction'

const Admin = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false)
    const account = useSelector(state => state.user.account)

    useEffect(() => {
        document.title = 'Admin | QUIZ'
    }, [])

    const handleLogout = async () => {
        const res = await postLogout(account.email, account.refresh_token)

        if (res && res.EC === 0) {
            dispatch(logout())
            navigate('/')
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="admin-container">
            <SideBar
                collapsed={collapsed}
            />

            <div className="admin-content">
                <div className="content-header">
                    <div>
                        <FaBars onClick={() => setCollapsed(!collapsed)} fontSize={20} cursor={'pointer'} />
                    </div>
                    <div
                        style={{ fontSize: '14px', cursor: 'pointer' }}
                        onClick={handleLogout}
                    >
                        <IoLogOutOutline fontSize={24} />
                        <span className="ms-1">Log out</span>
                    </div>
                </div>
                <div className="content-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin