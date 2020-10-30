import { useEffect, useReducer, useState } from "react"
import * as actions from '../reducer/actions'
import reducer from '../reducer/reducer'
import Loader from './Loader'
import Input from './Input'
import { Redirect } from "react-router-dom"
import Icon from "./Icon"
import { backgrounds } from '../utils/backgrounds'

const MainScreen = props => {
    const [state, dispatch] = useReducer(reducer, {})
    const [loginBtn, setLoginBtn] = useState(false)
    const [formstate, setFormstate] = useState({
        username: '', email: '', password: ''
    })
    const [formloginstate, setFormloginstate] = useState({
        username_login: '', password_login: ''
    })

    const onSubmitRegister = async (e) => {
        e.preventDefault();
        await actions.register(formstate.username, formstate.email, formstate.password, dispatch)
        await actions.login(formstate.username, formstate.password, dispatch)
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
    // let bg = backgrounds[Math.floor(Math.random() * (backgrounds.length+1 + 0) - 0)]

    useEffect(() => {
        actions.get_count(dispatch)
    }, [])
    if (state.isLoading) return <Loader />;
    return (
        <>
            <div className="main__layout__wrapper-header main__header" style={{
                background: backgrounds[15]
            }}><h1 onClick={() => window.location = 'http://mysocials.ru/'}>MYSOCIALS.RU</h1>
                <p>Страница с мультиссылкой на любые сервисы бесплатно</p>
            </div>
            <Icon type='planet' size='20' style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        margin: 'auto',
                        paddingTop: '20px',
                        fontSize: '20px'
                    }} text={`Нас уже ${state.count !== undefined && state.count['COUNT(*)'] * 214}!`} />
            <div className="main__layout__wrapper-content">
          
                <div className="main__layout__wrapper-content__left">
                    <img style={{
                        width: '100%'
                    }} src={`/img/${window.matchMedia('(prefers-color-scheme: dark)').matches ? '2' : '1'}.png`} alt='img' />
                   

                </div>
                <div className='mainscreen__content'>
                    <p style={{textAlign: 'center'}}>{!loginBtn ? 'Регистрация' : 'Авторизация'}</p>
                    {
                        !loginBtn && <form onSubmit={onSubmitRegister}>
                            <Input inputplaceholder='username' type='text' required value={formstate.username} onChange={e => onFormChange(e)} name='username' />
                            <Input inputplaceholder='email' type='email' required value={formstate.email} onChange={e => onFormChange(e)} name='email' />
                            <Input inputplaceholder='password' type='password' required value={formstate.password} onChange={e => onFormChange(e)} name='password' minLength='8' />
                            <button type='submit' className='button button-success register_login' disabled={[formstate.username, formstate.email, formstate.password].some(v => v.length === 0)} >Создать аккаунт</button>
                            {
                                state.success !== undefined && !state.success && <Icon size='14' style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }} type='cross' text='данный username занят' />
                            }
                        </form>
                    }
                    {
                        loginBtn && <form onSubmit={onSubmitLogin}>
                            <Input inputplaceholder='username' type='text' required value={formloginstate.username_login} onChange={e => onFormLoginChange(e)} name='username_login' />
                            <Input inputplaceholder='password' type='password' required value={formloginstate.password_login} onChange={e => onFormLoginChange(e)} name='password_login' minLength='8' />
                            <button type='submit' className='button button-success register_login' disabled={[formloginstate.username_login, formloginstate.password_login].some(v => v.length === 0)} >login</button>
                            {
                                state.success !== undefined && !state.success && <Icon size='14' style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }} type='cross' text='неверный логин или пароль' />
                            }
                            {
                                state.success && state.id !== undefined && <Redirect to={{
                                    pathname: "/settings",
                                    state,
                                    dispatch
                                }} />
                            }
                        </form>
                    }
                    <Icon size='14' className='button' style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }} onClick={() => setLoginBtn(!loginBtn)} text={loginBtn ? 'Нет аккаунта? Создать' : 'Есть аккаунт? Войти'} />
                    <div className="left-links">
                        <p><a href='/privacy'>Конфиденциальность</a></p>
                        {/* <p><a href='https://twitter.com/admin'>mysocials.ru</a></p> */}
                    </div>
                </div>

            </div>
        </>
    )
}

export default MainScreen