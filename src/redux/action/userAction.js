export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const login = data => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}