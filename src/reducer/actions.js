
import {
    REGISTER, LOGIN,
    START_LOADING, STOP_LOADING,
    SELECT_PROFILE, SAVE_PROFILE
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

export const login = (username, password, dispatch) => {
    dispatch({ type: START_LOADING })
    fetch(`http://localhost:4000/api/login/${username}/${password}`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => {
        return r.json()
    }).then(r => {
        dispatch({ type: LOGIN, payload: { username, password, data: r } })
    }).catch(e => {
        console.log('register error - ', e)
        dispatch({ type: LOGIN, payload: { success: false, username, password } })
    }).finally(() => {
        dispatch({ type: STOP_LOADING })
    })
}

export const select_profile = (username, dispatch) => {
    dispatch({ type: START_LOADING })
    fetch('http://localhost:4000/api/user/' + username, {
        mode: 'cors'
    }).then(res => {
        return res.json()
    }).then(res => {
        dispatch({ type: SELECT_PROFILE, payload: res.data })
    }).finally(() => {
        dispatch({ type: STOP_LOADING })
    })
}

export const save_profile = (data, dispatch) => {
    dispatch({ type: START_LOADING })
    fetch('http://localhost:4000/api/save', {
        mode: 'cors',
        method: 'put',
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).then(res => {
        console.log(res);
        // dispatch({type: SAVE_PROFILE, payload: res.data})
    }).finally(() => {
        dispatch({ type: STOP_LOADING })
    })
}
