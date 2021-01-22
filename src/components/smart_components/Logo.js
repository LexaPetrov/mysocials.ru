import { useContext, useEffect, createRef } from "react"
import { login_from_header, user_is_auth } from "../../reducer/actions";
import { store } from "../../reducer/store"
import Icon from "../dumb_components/Icon";
import Modal from '../dumb_components/Modal'
import { Redirect } from "react-router-dom"
import NotificationSystem from 'react-notification-system';

const Logo = props => {
    let notificationSystem = createRef();
    const globalState = useContext(store);
    const { state, dispatch } = globalState
    const { modal } = state

    useEffect(() => {
        user_is_auth(dispatch)
        // eslint-disable-next-line
    }, [])

    const settingsFromHeader = () => {
        login_from_header(state.who.username, dispatch)
    }

    useEffect(() => {
        if (state.notificationmessage && !state.isLoading) {
            notificationSystem.current.addNotification({
                message: state.notificationmessage,
                level: state.success ? 'success' : 'error'
            });
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <div style={{ maxWidth: '1920px', width: '100%', margin: 'auto' }} >
            <NotificationSystem ref={notificationSystem} />
            <div style={{ maxWidth: '1130px', margin: 'auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div className={'logo2 hover ' + props.absolute} onClick={() => window.open('https://mysocials.ru', '_self')} style={{ background: props.bg }}>
                    <p className='logo2__1'>MY</p>
                    <p className='logo2__2'>SOCIALS </p>
                </div>
                {
                    props.main && (
                        <div className='header__links'>
                            <a href='https://mysocials.ru/#register' className='hover' style={{ marginRight: 'auto' }}>создать страницу</a>
                            {
                                !state.who.username
                                    ? (
                                        state.isLoading ? <img style={{
                                            height: '40px', width: '40px', minWidth: '40px'
                                        }} src={'/img/loading.gif'} alt='loader' /> :
                                            <a className={`hover`} href='https://mysocials.ru/#login' >{state.isLoading ? 'загзузка...' : 'войти'}</a>
                                    )
                                    : (

                                        <div className='hover user_is_auth-link' >
                                            <div className={''} style={{
                                                height: '45px', width: '45px', minWidth: '45px', marginRight: '10px', borderRadius: '50%',
                                                background: state.who.avatar !== null && state.who.avatar !== undefined && state.who.avatar.includes('data') && state.who.avatar !== '' && state.who.avatar !== 'null' ? `url(${state.who.avatar})` : `${state.who.avatar}`,
                                                backgroundSize: 'contain', backgroundPosition: 'center'
                                            }}></div>
                                            <Icon text={state.who.username} className='user_is_auth-link hover' onClick={() => dispatch({ type: 'OPEN_MODAL' })} />
                                        </div>
                                    )
                            }
                        </div>
                    )
                }
            </div>
            {
                state.toSettings && <Redirect to={{
                    pathname: "/settings",
                    state
                }} />
            }
            <Modal closeButton style={{ position: 'fixed', bottom: 0, left: 0 }} title={state.who.username} isOpened={modal} onModalClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
                <div className='center fdc'>
                    <Icon text='Моя страница' className='button hover w100p  button-success' onClick={() => window.open('https://mysocials.ru/' + state.who.username, '_self')} />
                    <Icon text='Настройки страницы' className='button hover w100p  button-info' onClick={settingsFromHeader} />
                    <Icon text='Выйти' className='button hover w100p  button-danger' onClick={() => { localStorage.removeItem('token'); window.open('/', '_self') }} />
                </div>
            </Modal>

        </div >

    )
}

export default Logo