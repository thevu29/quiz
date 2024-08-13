import axios from '../utils/axiosCustom'

const getQuestionByQuiz = quizId => {
    return axios.get(`/api/v1/quiz-with-qa/${quizId}`)
}

const postAddQuestion = (quizId, description, questionImage) => {
    const data = new FormData()
    data.append('quiz_id', quizId)
    data.append('description', description)
    data.append('questionImage', questionImage)
    return axios.post('api/v1/question', data)
}

const putUpdateQuestion = (quizId, questionId, description, questionImage) => {
    const data = new FormData()
    data.append('quiz_id', quizId)
    data.append('id', questionId)
    data.append('description', description)
    data.append('questionImage', questionImage)
    return axios.put('api/v1/question', data)
}

export { getQuestionByQuiz, postAddQuestion, putUpdateQuestion }