import { ReactSVG } from 'react-svg'
import image from '../../assets/icons/not-found.svg'
import './NotFound.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
    useEffect(() => {
        document.title = '404 - Not Found'
    }, [])

    return (
        <div className="notfound-container">
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-6">
                        <div className="notfound-information">
                            <h2>Something is not right...</h2>
                            <p>
                                Page you are trying to open does not exist.
                                You may have mistyped the address, or the page has been moved to another URL.
                                If you think this is an error contact support.
                            </p>
                            <Link to="/" className="btn btn-outline-primary">Get back to your home page</Link>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="notfound-image">
                            <ReactSVG src={image} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound