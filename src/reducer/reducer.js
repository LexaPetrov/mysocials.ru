import {
    STOP_LOADING,
    START_LOADING,
    REGISTER
} from './actiontypes'

const initialState = {
    id: '',
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
                icon: '',
                type: 'link'
            }
        ]
    },
    avatar: '',
    cover: ''
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