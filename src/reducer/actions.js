
import {
    REGISTER, LOGIN,
    START_LOADING, STOP_LOADING, NOT_AUTHTORIZED,
    SELECT_PROFILE, GET_COUNT, DELETE_USER, SAVE_PROFILE
} from './actiontypes'

import { BACKEND_HOST } from '../utils/env'

export const register = async (username, email, password, dispatch) => {
    dispatch({ type: START_LOADING })
    await fetch(`${BACKEND_HOST}/api/register`, {
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
        // console.log(r);
        dispatch({ type: REGISTER, payload: { username, email, password, data: r } })
    }).catch(e => {
        // console.log('register error - ', e)
        dispatch({ type: REGISTER, payload: { success: false, username, email, password } })
    }).finally(() => {
        dispatch({ type: STOP_LOADING })
    })
}

export const login = (username, password, dispatch) => {
    dispatch({ type: START_LOADING })
    fetch(`${BACKEND_HOST}/api/login/`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, password
        })
    }).then(r => {
        return r.json()
    }).then(r => {
        dispatch({ type: LOGIN, payload: { username, password, data: r } })
    }).catch(e => {
        // console.log('register error - ', e)
        dispatch({ type: LOGIN, payload: { success: false, username, password } })
    }).finally(() => {
        dispatch({ type: STOP_LOADING })
    })
}

export const select_profile = (username, dispatch) => {
    dispatch({ type: START_LOADING })
    fetch(`${BACKEND_HOST}/api/user/` + username, {
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
    fetch(`${BACKEND_HOST}/api/save`, {
        mode: 'cors',
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ data })
    }).then(res => {
        return res.json()
    }).then(res => {
        dispatch({ type: SAVE_PROFILE, payload: res })
    }).finally(() => {
        dispatch({ type: STOP_LOADING })
    })
}

export const get_count = (dispatch) => {
    fetch(`${BACKEND_HOST}/api/getcount`)
        .then(res => res.json())
        .then((res) => {
            dispatch({ type: GET_COUNT, payload: res })
        })
        .catch(err => {
            // console.log(err)
        })
}

export const delete_user = (username, password, id, dispatch) => {
    // is_auth().then(res => {
    //     return res.json()
    // }).then(r => {
    //     if (r.auth) {
    fetch(`${BACKEND_HOST}/api/delete?username=` + username + '&password=' + password + '&id=' + id, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => res.json())
        .then((res) => {
            dispatch({ type: DELETE_USER, payload: res })
        })
        .catch(err => {
            // console.log(err)
        })
    //     } else {
    //         dispatch({ type: NOT_AUTHTORIZED })
    //     }
    // })
}

export const is_auth = () => {
    return fetch(`${BACKEND_HOST}/api/me`, {
        method: 'get',
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
}

export const visit = (date, username) => {//62.76.152.151
    return fetch(`${BACKEND_HOST}/api/visit/`, {
        method: 'post',
        mode: 'cors', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: date.toLocaleDateString(), username })
    })
}