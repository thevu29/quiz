import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../action/userAction'

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        email: '',
        image: '',
        role: ''
    },
    isAuthenticated: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    email: action?.payload?.DT?.email,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role
                },
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    email: '',
                    image: '',
                    role: ''
                },
                isAuthenticated: false
            }
        default:
            return state
    }
}

export default userReducer