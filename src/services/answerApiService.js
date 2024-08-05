import axios from '../utils/axiosCustom'

const postAddAnswer = (question_id, description, correct_answer) => {
    return axios.post('api/v1/answer', { question_id, description, correct_answer })
}

const putUpdateAnswer = (question_id, answer_id, description, correct_answer) => {
    return axios.put('api/v1/answer', { question_id, answer_id, description, correct_answer })
}

export { postAddAnswer, putUpdateAnswer }