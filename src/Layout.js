import { Routes, Route } from 'react-router-dom'
import AppLogo from './assets/images/app-logo.png'
import Favicon from 'react-favicon'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage'
import ManageUser from './components/Admin/content/ManageUser'
import Dashboard from './components/Admin/content/Dashboard'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import QuizList from './components/User/QuizList'

const Layout = () => {
    return (
        <>
            <Favicon url={AppLogo} />

            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="quiz" element={<QuizList />} />
                </Route>

                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Layout