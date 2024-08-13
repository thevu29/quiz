import axios from '../utils/axiosCustom'

const getDashboard = () => {
    return axios.get('api/v1/overview')
}

export { getDashboard }