import axios from '../utils/axiosCustom'

const getAllQuizzes = () => {
    return axios.get('api/v1/quiz/all')
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getQuizDetailById = quizId => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`)
}

const postSubmitQuiz = payload => {
    return axios.post('api/v1/quiz-submit', { ...payload })
}

const postAddQuiz = (name, description, difficulty, quizImage) => {
    const data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage)
    return axios.post('api/v1/quiz', data)
}

const putUpdateQuiz = (id, name, description, difficulty, quizImage) => {
    const data = new FormData()
    data.append('id', id)
    data.append('name', name)
    data.append('description', description)
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage)
    return axios.put('api/v1/quiz', data)
}

const deleteQuiz = id => {
    return axios.delete(`api/v1/quiz/${id}`)
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}

const postUpsertQA = payload => {
    return axios.post('api/v1/quiz-upsert-qa', { ...payload })
}

export {
    getQuizByUser,
    getQuizDetailById,
    postSubmitQuiz,
    postAddQuiz,
    getAllQuizzes,
    putUpdateQuiz,
    deleteQuiz,
    postAssignQuiz,
    postUpsertQA
}