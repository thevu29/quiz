import axios from '../utils/axiosCustom'

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

export { getQuizByUser }