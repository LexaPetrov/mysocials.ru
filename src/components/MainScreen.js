import { useEffect, useReducer, useState } from "react"
import * as actions from '../reducer/actions'
import reducer from '../reducer/reducer'
import Loader from './Loader'
import Input from './Input'

const MainScreen = props => {
    const [state, dispatch] = useReducer(reducer, {})
    const [formstate, setFormstate] = useState({
        username: '', email: '', password: ''
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

    console.log(formstate);

    if (state.isLoading) return <Loader />;
    return (
        <div>
            <form onSubmit={onSubmitRegister}>
                <Input type='text' required value={formstate.username} onChange={e => onFormChange(e)} name='username' />
                <Input type='email' required value={formstate.email} onChange={e => onFormChange(e)} name='email' />
                <Input type='password' required value={formstate.password} onChange={e => onFormChange(e)} name='password' minLength='8' />
                <button type='submit' className='button' disabled={[formstate.username, formstate.email, formstate.password].some(v => v.length === 0)} >sss</button>
                {
                    state.success !== undefined && !state.success ? 'LOX' : null
                }
            </form>
        </div>
    )
}

export default MainScreen