import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar'
import { FaGem, FaGithub } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom'

const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props

    return (
        <div className="admin-sidebar">
            <ProSidebar
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '0 16px',
                            margin: '24px 0',
                            textTransform: 'uppercase',
                            fontWeight: '700',
                            fontSize: 20,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                        className="sidebar-header"
                    >
                        <div className="sidebar-header-logo">Q</div>
                        <span>Quiz</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu>
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            Dashboard
                            <Link to="/admin" />
                        </MenuItem>
                        <SubMenu
                            icon={<FaGem />}
                            title={"Features"}
                        >
                            <MenuItem>
                                Manage User
                                <Link to="/admin/manage-user" />
                            </MenuItem>
                            <MenuItem>
                                Manage Quiz
                                <Link to="/admin/manage-quiz" />
                            </MenuItem>
                            <MenuItem>
                                Manage Question
                                <Link to="/admin/manage-question" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/thevu29"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Thế Vũ
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </div>
    )
}

export default SideBar