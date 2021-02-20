import { useEffect, useReducer, useState, createRef } from "react"
import * as actions from '../../reducer/actions'
import reducer from '../../reducer/reducer'
import Loader from '../dumb_components/Loader'
import Input from '../dumb_components/Input'
import Modal from '../dumb_components/Modal'
import { Redirect } from "react-router-dom"
import Icon from "../dumb_components/Icon"
import Recaptcha from 'react-recaptcha'
import Header from "../smart_components/Header"
import NotificationSystem from 'react-notification-system';
import News from "../smart_components/News"

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
        if(window.ym) {
            window.ym(72742615,'reachGoal','registerSubmit')
        }
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
        if(window.ym) {
            window.ym(72742615,'reachGoal','loginSubmit')
        }
        await actions.login(formloginstate.username_login, formloginstate.password_login, dispatch)
    }

    useEffect(() => {
        if (window.location.hash === '#login') {
            setModal({ ...modal, login: true })
        } else if (window.location.hash === '#register') {
            setModal({ ...modal, register: true })
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.hash])

    useEffect(() => {
        actions.get_count(dispatch)
    }, [])
    useEffect(() => {
        if (state.success_register) {
            actions.login(formstate.username, formstate.password, dispatch)
        }
        // if (state.success) setModal({ ...modal, login: true, register: false })
        if (!state.success && state.success !== undefined) setModal({ ...modal, register: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.success, state.isLoading, state.success_register])

    useEffect(() => {
        if (state.notificationmessage && !state.isLoading) {
            notificationSystem.current.addNotification({
                message: state.notificationmessage,
                level: state.success ? 'success' : 'error'
            });
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    const onLoadCaptcha = () => {
        setCaptcha(false)
    }

    const verifyCallback = res => {
        if (res) {
            setCaptcha(true)
        }
    }

    const list = [
        { type: 'medal', text: 'наши преимущества:' },
        { type: 'free', text: 'полностью бесплатно' },
        { type: 'infinity', text: 'любое количество ссылок' },
        { type: 'like', text: 'удобный редактор профиля' },
        { type: 'phone_off', text: 'нет рекламы' },
        { type: 'wow', text: '50+ вариантов иконок' },
        { type: 'paint', text: '20+ градиентов для профиля' },
        { type: 'chart', text: 'статистика посещений' },
        { type: 'new', text: 'частые обновления' },
    ]


    let notificationSystem = createRef();
    if (state.isLoading) return <Loader />;
    return (
        <>
            <Header main  />
            <NotificationSystem ref={notificationSystem} />
            <div className="main__layout__wrapper-content" >
                <div className="main__layout__wrapper-content__left" >
                    <div style={{ alignItems: 'center', padding: '20px' }}>
                        <h1>Добро пожаловать на MYSOCIALS.RU!</h1>
                        <br />
                        <p>Создай страницу с мультиссылкой на свои соцсети для инстаграма (и не только) совершенно бесплатно!</p>
                        <br />
                        <br />
                        {
                            list.map((v, k) => <Icon key={k} className='center__icon' type={v.type} size='26' style={{
                                fontSize: '16px', marginTop: '10px', pointerEvents: 'none'
                            }} text={v.text} />)
                        }
                    </div>


                </div>
                <div className='mainscreen__content'>
                    <div style={{ textAlign: 'center' }} className={`${state.isLoading && 'shine'}`}>
                        {/* <img className={`top ${state.isLoading && 'shine'}`} style={{
                            width: '50%'
                        }} src={`/img/1.png`} alt='img' /> */}
                        <img className={`top ${state.isLoading && 'shine'}`} style={{
                            width: '100%',
                           marginTop: '30px',
                           marginBottom: '30px',
                           borderRadius: 'var(--border_radius)',
                           boxShadow:'var(--NOT_ACTIVE_SHADOW_2)'
                        }} src={`/img/vibe.gif`} alt='img' />
                    </div>
                    <div className='register_login__wrapper'>
                        <Icon size='14' fz='18' className='button hover button-success center__icon' onClick={() => { setModal({ ...modal, register: true }) }} text={'Создать страницу'} />
                        <Icon size='14' fz='18' className='button hover button-info center__icon' onClick={() => { setModal({ ...modal, login: true }) }} text={'Войти'} />
                    </div>

                      
                    {/* <div className="left-links main__screen">
                        <p><a href='/privacy'>Конфиденциальность</a></p>
                    </div> */}
                </div>
            </div>
            <Modal title='Регистрация' isOpened={modal.register} onModalClose={() => { window.location.hash = ''; setModal({ ...modal, register: false }) }}>
                <div className='modal__form'>
                    <form id='submitRegister' onSubmit={onSubmitRegister}>
                        <Input inputplaceholder='username' type='text' required value={formstate.username} onChange={e => onFormChange(e)} name='username' />
                        <Input inputplaceholder='email' type='email' required value={formstate.email} onChange={e => onFormChange(e)} name='email' />
                        <Input inputplaceholder='password' type='password' required value={formstate.password} onChange={e => onFormChange(e)} name='password' minLength='8' />
                        <div>
                            {
                                modal.register && (
                                    <Recaptcha
                                        elementID='register-captcha'
                                        sitekey="6Lcsc90ZAAAAABI13YttPvIZDEyXZ-ij36rg5W7F"
                                        render="explicit"
                                        verifyCallback={verifyCallback}
                                        onloadCallback={onLoadCaptcha}
                                        size='compact'
                                        hl='ru'
                                    />
                                )
                            }
                        </div>
                        <button type='submit' className='button button-success register_login hover mt10' disabled={captcha === false || [formstate.username, formstate.email, formstate.password].some(v => v.length === 0)} >Создать аккаунт</button>
                    </form>
                </div>
            </Modal>
            <Modal title='Авторизация' isOpened={modal.login} onModalClose={() => { window.location.hash = ''; setModal({ ...modal, login: false }) }}>
                <div className='modal__form'>
                    <form id='submitLogin' onSubmit={onSubmitLogin}>
                        <Input inputplaceholder='username' type='text' required value={formloginstate.username_login} onChange={e => onFormLoginChange(e)} name='username_login' />
                        <Input inputplaceholder='password' type='password' required value={formloginstate.password_login} onChange={e => onFormLoginChange(e)} name='password_login' minLength='8' />
                        <div>
                            {
                                modal.login && (
                                    <Recaptcha
                                        elementID='login-captcha'
                                        sitekey="6Lcsc90ZAAAAABI13YttPvIZDEyXZ-ij36rg5W7F"
                                        render="explicit"
                                        verifyCallback={verifyCallback}
                                        onloadCallback={onLoadCaptcha}
                                        size='compact'
                                        hl='ru'
                                    />
                                )
                            }
                        </div>
                        <button type='submit' className='button button-success register_login hover mt10' disabled={captcha === false || [formloginstate.username_login, formloginstate.password_login].some(v => v.length === 0)} >Войти</button>
                        {
                            state.auth && state.success && state.id !== undefined && <Redirect to={{
                                pathname: "/settings",
                                state
                            }} />
                        }
                    </form>
                </div>
            </Modal>
            <News />
            <div className='container center' style={{
                color: 'var(--main_gray)', fontSize: '10px'
            }}>
                © 2020-2021<span className={state.count ? 'online' : 'offline'}>&nbsp; • &nbsp;</span><p><a href='/privacy'>Конфиденциальность</a></p>
                <br/>
                <br/>
                <br/>
            </div>
        </>
    )
}

export default MainScreen