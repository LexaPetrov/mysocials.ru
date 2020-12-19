import {
    STOP_LOADING,
    START_LOADING,
    REGISTER,
    SELECT_PROFILE,
    LOGIN,
    GET_COUNT
} from './actiontypes'

const initialState = {
    password: '',
    email: '',
    name: '',
    username: '',
    bio: '',
    birthday: '',
    verified: false,
    links: {
        data: [
            {
                title: '',
                link: '',
                type: 'link'
            }
        ]
    },
    avatar: '',
    cover: '',
    success: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            if (action.payload.data !== undefined && action.payload.data.errno) {
                return {
                    ...state,
                    success: false
                }
            } else {
                return {
                    ...state,
                    username: action.payload.username,
                    email: action.payload.email,
                    password: action.payload.password,
                    success: true
                }
            }
        case LOGIN:
            if (action.payload.data.data[0]) {
                return {
                    ...state,
                    ...action.payload.data.data[0],
                    success: true
                }
            } else {
                return {
                    ...state, success: false
                }
            }
        case SELECT_PROFILE:
            return {
                ...state,
                ...action.payload[0],
                links: JSON.parse(action.payload[0].links)
            }
        case GET_COUNT:
            return {
                ...state,
                count: action.payload[0]
            }
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default reducer