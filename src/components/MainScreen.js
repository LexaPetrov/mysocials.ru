import { useReducer, useState } from "react"
import * as actions from '../reducer/actions'
import reducer from '../reducer/reducer'
import Loader from './Loader'
import Input from './Input'
import { Redirect } from "react-router-dom"
import SettingsScreen from "./SettingsScreen"

const MainScreen = props => {
    const [state, dispatch] = useReducer(reducer, {})
    const [formstate, setFormstate] = useState({
        username: '', email: '', password: ''
    })
    const [formloginstate, setFormloginstate] = useState({
        username_login: '', password_login: ''
    })

    const onSubmitRegister = (e) => {
        e.preventDefault();
        actions.register(formstate.username, formstate.email, formstate.password, dispatch)
    }

    const onFormChange = e => {
        setFormstate({
            ...formstate,
            [e.target.name]: e.target.value
        })
    }

    const onFormLoginChange = e => {
        setFormloginstate({
            ...formloginstate,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitLogin = e => {
        e.preventDefault();
        actions.login(formloginstate.username_login, formloginstate.password_login, dispatch)
    }
    console.log(1, state);
    if (state.isLoading) return <Loader />;
    return (
        <div>
            <form onSubmit={onSubmitRegister}>
                <Input type='text' required value={formstate.username} onChange={e => onFormChange(e)} name='username' />
                <Input type='email' required value={formstate.email} onChange={e => onFormChange(e)} name='email' />
                <Input type='password' required value={formstate.password} onChange={e => onFormChange(e)} name='password' minLength='8' />
                <button type='submit' className='button' disabled={[formstate.username, formstate.email, formstate.password].some(v => v.length === 0)} >register</button>
                {
                    state.success !== undefined && !state.success ? 'LOX' : null
                }
            </form>
            <form onSubmit={onSubmitLogin}>
                <Input type='text' required value={formloginstate.username_login} onChange={e => onFormLoginChange(e)} name='username_login' />
                <Input type='password' required value={formloginstate.password_login} onChange={e => onFormLoginChange(e)} name='password_login' minLength='8' />
                <button type='submit' className='button' disabled={[formloginstate.username_login, formloginstate.password_login].some(v => v.length === 0)} >login</button>
                {
                    state.success !== undefined && !state.success ? 'LOX' : null
                }
                {
                    state.success && <Redirect to={{
                        pathname: "/settings",
                        state
                    }} />
                }
            </form>
        </div>
    )
}

export default MainScreen