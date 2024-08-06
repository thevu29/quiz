import { useEffect, useState } from 'react'

const CountDown = (props) => {
    const { handleSubmitQuiz, results, isRedo } = props

    const [duration, setDuration] = useState(600)
    const [isActive, setIsActive] = useState(true)

    const formatDuration = seconds => {
        const date = new Date(0)
        date.setSeconds(seconds)
        return date.toISOString().substring(11, 19)
    }

    useEffect(() => {
        if (!isActive) return

        if (duration === 0) {
            handleSubmitQuiz()
            setIsActive(false)
            return
        }

        const timerId = setInterval(() => {
            setDuration(prevTime => prevTime - 1)
        }, 1000)

        return () => clearInterval(timerId)
    }, [isActive, duration, handleSubmitQuiz])

    useEffect(() => {
        if (results) {
            setIsActive(false)
        }
    }, [results])

    useEffect(() => {
        if (isRedo) {
            setIsActive(true)
            setDuration(600)
        }
    }, [isRedo])

    return (
        <div className="d-flex align-items-center count-down-container">
            <span className="fs-5">{formatDuration(duration)}</span>
        </div>
    )
}

export default CountDown