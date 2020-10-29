
import {
    REGISTER,
    START_LOADING, STOP_LOADING
} from './actiontypes'

export const register = (username, email, password, dispatch) => {
    dispatch({ type: START_LOADING })
    fetch('http://localhost:4000/api/register', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, email, password
        })
    }).then(r => {
        return r.json()
    }).then(r => {
        dispatch({ type: REGISTER, payload: { username, email, password, data: r } })
    }).catch(e => {
        console.log('register error - ', e)
        dispatch({ type: REGISTER, payload: { success: false, username, email, password } })
    }).finally(() => {
        dispatch({ type: STOP_LOADING })
    })
}


