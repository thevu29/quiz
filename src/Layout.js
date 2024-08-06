import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppLogo from './assets/images/app-logo.png'
import Favicon from 'react-favicon'
import App from './App'
import HomePage from './components/Home/HomePage'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import QuizList from './components/User/QuizList'
import QuizDetail from './components/User/QuizDetail'
import NotFound from './components/NotFound/NotFound'
import Admin from './components/Admin/Admin'
import Dashboard from './components/Admin/content/Dashboard/Dashboard'
import ManageUser from './components/Admin/content/User/ManageUser'
import ManageQuiz from './components/Admin/content/Quiz/ManageQuiz'
import ManageQuestion from './components/Admin/content/Question/ManageQuestion'
import PrivateRoute from './routes/PrivateRoute'

const Layout = () => {
    return (
        <>
            <Favicon url={AppLogo} />

            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="quiz" element={
                        <PrivateRoute>
                            <QuizList />
                        </PrivateRoute>
                    } />
                    <Route path="/quiz/:id" element={<QuizDetail />} />
                </Route>

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="manage-quiz" element={<ManageQuiz />} />
                    <Route path="manage-question" element={<ManageQuestion />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
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