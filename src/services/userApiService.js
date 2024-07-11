import axios from '../utils/axiosCustom'

const getALlUsers = () => {
    return axios.get('api/v1/participant/all')
}

const getPaginateUsers = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postAddUser = (email, password, username, role, userImage) => {
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)
    data.append('username', username)
    data.append('role', role)
    data.append('userImage', userImage)
    return axios.post('api/v1/participant', data)
}

const putUpdateUser = (id, username, role, userImage) => {
    const data = new FormData()
    data.append('id', id)
    data.append('username', username)
    data.append('role', role)
    data.append('userImage', userImage)
    return axios.put('api/v1/participant', data)
}

const deleteUser = id => {
    return axios.delete('api/v1/participant', { data: { id } })
}

export { getALlUsers, getPaginateUsers, postAddUser, putUpdateUser, deleteUser }