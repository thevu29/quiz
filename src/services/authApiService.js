import axios from '../utils/axiosCustom'

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password })
}

export { postLogin }