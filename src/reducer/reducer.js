import {
    STOP_LOADING,
    START_LOADING,
    REGISTER,
    SELECT_PROFILE,
    LOGIN,
    GET_COUNT,
    DELETE_USER,
    SAVE_PROFILE
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
            return {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                notificationmessage: action.payload.data.notificationmessage,
                success: action.payload.data.success
            }
        case LOGIN:
            return {
                ...state,
                ...action.payload.data[0],
                success: action.payload.data.success,
                notificationmessage: action.payload.data.notificationmessage
            }
        case SELECT_PROFILE:
            return {
                ...state,
                ...action.payload[0],
                links: JSON.parse(action.payload[0].links)
            }
        case SAVE_PROFILE:
            return {
                ...state,
                success: action.payload.success,
                notificationmessage: action.payload.notificationmessage
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
        case DELETE_USER:
            return {
                ...state,
                success_del: action.payload.success,
                notificationmessage_del: action.payload.notificationmessage
            }
        default:
            return state
    }
}

export default reducer