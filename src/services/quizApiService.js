import axios from '../utils/axiosCustom'

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getQuizDetailById = quizId => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`)
}

const postSubmitQuiz = payload => {
    return axios.post('api/v1/quiz-submit', {...payload})
}

const postAddQuiz = (name, description, difficulty, quizImage) => {
    const data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage)
    return axios.post('api/v1/quiz', data)
}

const getAllQuizzes = () => {
    return axios.get('api/v1/quiz/all')
}

export { getQuizByUser, getQuizDetailById, postSubmitQuiz, postAddQuiz, getAllQuizzes }