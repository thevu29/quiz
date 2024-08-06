import _ from 'lodash'

const Question = (props) => {
    const { question, quizIndex, handleChooseAnswer, results, isShowResult } = props

    if (_.isEmpty(question)) {
        return (<></>)
    }

    const handleOnChange = e => {
        const { name, value } = e.target
        handleChooseAnswer(name, value)
    }

    return (
        <>
            {question.image && (
                <div className="quiz-detail-img">
                    <img src={`data:image/jpeg;base64,${question.image}`} alt="" />
                </div>
            )}
            <div className="quiz-detail-question">
                <p className="quiz-detail-question-title">Question {quizIndex + 1}: {question.question}</p>
                <div className="quiz-detail-answer-list">
                    {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                        const isAnswerSelected = answer?.isSelected ? 'active' : ''
                        let resultClass = ''

                        if (isShowResult && results && results.quizData.length > 0) {
                            const quizItem = results.quizData.find(item => +item.questionId === +question.questionId)
                            
                            if (quizItem) {
                                const { userAnswers, systemAnswers, isCorrect } = quizItem
                                const userAnswer = userAnswers[0]
                                const systemAnswer = systemAnswers[0].id

                                resultClass = isCorrect
                                    ? (answer.id === userAnswer ? 'active' : '')
                                    : (answer.id === userAnswer
                                        ? 'error'
                                        : (answer.id === systemAnswer ? 'active' : '')
                                    )
                            }
                        }

                        const className = [
                            'quiz-detail-answer-item',
                            isAnswerSelected,
                            resultClass
                        ].filter(Boolean).join(' ')

                        return (
                            <label
                                key={`answer-${index}`}
                                htmlFor={answer?.id}
                                className={className}
                            >
                                <span>{String.fromCharCode(65 + index)}</span>
                                <span>{answer?.answer}</span>
                                <input
                                    type='radio'
                                    name={question.questionId}
                                    id={answer?.id}
                                    value={answer?.id}
                                    onChange={handleOnChange}
                                    checked={answer?.isSelected}
                                    hidden
                                />
                            </label>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Question