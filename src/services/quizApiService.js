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

export { getQuizByUser, getQuizDetailById, postSubmitQuiz }