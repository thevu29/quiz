import axios from '../utils/axiosCustom'

const postLogin = (email, password, delay = 3000) => {
    return axios.post('api/v1/login', { email, password, delay })
}

const postRegister = (email, password, username) => {
    return axios.post('api/v1/register', { email, password, username })
}

export { postLogin, postRegister }