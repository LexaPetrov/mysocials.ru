import { useEffect, useReducer, useState } from "react"
import * as actions from '../reducer/actions'
import reducer from '../reducer/reducer'
import Loader from './Loader'
import Input from './Input'
import Modal from './Modal'
import { Redirect } from "react-router-dom"
import Icon from "./Icon"
import Recaptcha from 'react-recaptcha'
import Header from "./Header"

const MainScreen = props => {
    const [state, dispatch] = useReducer(reducer, {})
    const [formstate, setFormstate] = useState({
        username: '', email: '', password: ''
    })
    const [formloginstate, setFormloginstate] = useState({
        username_login: '', password_login: ''
    })
    const [captcha, setCaptcha] = useState(true)
    const [modal, setModal] = useState({
        login: false,
        register: false
    })
    const onSubmitRegister = async (e) => {
        e.preventDefault();
        await actions.register(formstate.username, formstate.email, formstate.password, dispatch)
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

    const onSubmitLogin = async e => {
        e.preventDefault();
        await actions.login(formloginstate.username_login, formloginstate.password_login, dispatch)
    }
    // let bg = backgrounds[Math.floor(Math.random() * (backgrounds.length+1 + 0) - 0)]

    useEffect(() => {
        actions.get_count(dispatch)
        if (window.location.hash === '#login') {
            setModal({ login: true })
        } else if (window.location.hash === '#register') {
            setModal({ register: true })
        }
    }, [])
    useEffect(() => {
        if (state.success) setModal({ login: true })
        if (!state.success && state.success !== undefined) setModal({ register: true })
    }, [state.success])

    const onLoadCaptcha = () => {
        setCaptcha(false)
    }

    const verifyCallback = res => {
        if (res) {
            setCaptcha(true)
        }
    }

    const list = [
        { type: 'free', text: 'полностью бесплатно' },
        { type: 'infinity', text: 'любое количество ссылок' },
        { type: 'like', text: 'удобный редактор профиля' },
        { type: 'phone_off', text: 'нет рекламы' },
        { type: 'moon', text: 'светлая и тёмная тема' },
        { type: 'wow', text: '50+ вариантов иконок' },
        { type: 'paint', text: '20+ градиентов для профиля' },
        { type: 'new', text: 'частые обновления' },
        // { type: 'planet', text: state.count !== undefined ? `Нас уже ${state.count['COUNT(*)']}!` : null }
    ]

    if (state.isLoading) return <Loader />;
    return (
        <>
            <Header />
            <div className="main__layout__wrapper-content" >
                <div className="main__layout__wrapper-content__left" >
                    {/* <img style={{
                        width: '100%'
                    }} src={`/img/${window.matchMedia('(prefers-color-scheme: dark)').matches ? '2' : '1'}.png`} alt='img' /> */}
                    <div style={{ alignItems: 'center', padding: '20px' }}>
                        <h1>Добро пожаловать на MYSOCIALS.RU!</h1>
                        <br />
                        <p>Создай страницу с мультиссылкой на свои соцсети для инстаграма (и не только) совершенно бесплатно!</p>
                        <br />
                        <br />
                        {
                            list.map((v, k) => <Icon key={k} type={v.type} size='26' style={{
                                fontSize: '16px', display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: '10px', pointerEvents: 'none'
                            }} text={v.text} />)
                        }
                    </div>


                </div>
                <div className='mainscreen__content'>
                    <div className='register_login__wrapper'>
                        <Icon size='14' className='button' style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                            background: 'var(--green)'
                        }} onClick={() => { setModal({ register: true }) }}
                            text={'Создать страницу'} />
                        <Icon size='14' className='button' style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                            background: 'var(--info)'
                        }} onClick={() => { setModal({ login: true }) }}
                            text={'Войти'} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <img style={{
                            width: '50%'
                        }} src={`/img/${window.matchMedia('(prefers-color-scheme: dark)').matches ? '2' : '1'}.png`} alt='img' />
                    </div>
                    <div className="left-links main__screen">
                        <p><a href='/privacy'>Конфиденциальность</a></p>
                        {/* <p><a href='/'>v1.0.5</a></p> */}
                        {/* <p><a href='/'><img style={{ width: '170px', height: '50px' }} src='https://www.centrinvest.ru/images/mirpay/mp-gp.png' alt='img' /></a></p> */}
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>

            </div>
            <Modal title='Регистрация' isOpened={modal.register} onModalClose={() => setModal({ register: false })}>
                <div className='modal__form'>
                    <form onSubmit={onSubmitRegister}>
                        <Input inputplaceholder='username' type='text' required value={formstate.username} onChange={e => onFormChange(e)} name='username' />
                        <Input inputplaceholder='email' type='email' required value={formstate.email} onChange={e => onFormChange(e)} name='email' />
                        <Input inputplaceholder='password' type='password' required value={formstate.password} onChange={e => onFormChange(e)} name='password' minLength='8' />
                        <button type='submit' className='button button-success register_login' disabled={captcha === false || [formstate.username, formstate.email, formstate.password].some(v => v.length === 0)} >Создать аккаунт</button>
                        {
                            state.success !== undefined && !state.success && <Icon size='14' style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }} type='cross' text='данный username занят' />
                        }
                        <div style={{ alignSelf: 'center' }}>
                            {
                                modal.register && (
                                    <Recaptcha
                                        sitekey="6Lcsc90ZAAAAABI13YttPvIZDEyXZ-ij36rg5W7F"
                                        render="explicit"
                                        verifyCallback={verifyCallback}
                                        onloadCallback={onLoadCaptcha}
                                        theme={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
                                        size='compact'
                                        hl='ru'
                                    />
                                )
                            }
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal title='Авторизация' isOpened={modal.login} onModalClose={() => setModal({ login: false })}>
                <div className='modal__form'>
                    <form onSubmit={onSubmitLogin}>
                        <Input inputplaceholder='username' type='text' required value={formloginstate.username_login} onChange={e => onFormLoginChange(e)} name='username_login' />
                        <Input inputplaceholder='password' type='password' required value={formloginstate.password_login} onChange={e => onFormLoginChange(e)} name='password_login' minLength='8' />
                        <button type='submit' className='button button-success register_login' disabled={captcha === false || [formloginstate.username_login, formloginstate.password_login].some(v => v.length === 0)} >Войти</button>
                        {
                            state.success !== undefined && !state.success && <Icon size='14' style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }} type='cross' text='неверный логин или пароль' />
                        }
                        <div style={{ alignSelf: 'center' }}>
                            {
                                modal.login && (
                                    <Recaptcha
                                        sitekey="6Lcsc90ZAAAAABI13YttPvIZDEyXZ-ij36rg5W7F"
                                        render="explicit"
                                        verifyCallback={verifyCallback}
                                        onloadCallback={onLoadCaptcha}
                                        theme={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
                                        size='compact'
                                        hl='ru'
                                    />
                                )
                            }
                        </div>
                        {
                            state.success && state.id !== undefined && <Redirect to={{
                                pathname: "/settings",
                                state
                            }} />
                        }
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default MainScreen