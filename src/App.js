import { Outlet, Navigate } from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Footer from './components/Footer/Footer'

const App = () => {
  const account = useSelector(state => state.user.account)

  useEffect(() => {
    document.title = 'QUIZ'
  }, [])

  if (account.role === 'ADMIN') {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="content-container">
        <div className="nav-container">

        </div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  )
}

export default App