export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const login = data => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}