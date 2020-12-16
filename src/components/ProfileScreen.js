import { useEffect, useReducer, useState } from 'react'
import reducer from '../reducer/reducer';
import Icon from './Icon';
import Loader from './Loader'
import * as actions from '../reducer/actions'
import Logo from './Logo';

const ProfileScreen = props => {
    const [state, dispatch] = useReducer(reducer, {})
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        let username = window.location.pathname.replace('/', '')
        actions.select_profile(username, dispatch)
    }, [])

    const copyToClipboard = () => {
        let textField = document.createElement('textarea')
        textField.innerText = window.location.href
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }


    const formatLink = (type, link) => {
        switch (type) {
            case 'gmail': case 'mailru': case 'email': case 'yandexmail':
                return (
                    <a className='link__href' href={`mailto:${link}`}>{formatHref(link)}</a>
                )
            case 'viber':
                return (
                    <a className='link__href' href={`viber://add?number=${link}`}>{formatHref(link)}</a>
                )
            case 'whatsapp':
                return (
                    <a className='link__href' href={`https://api.whatsapp.com/send?phone=${link}`}>{formatHref(link)}</a>
                )
            case 'skype':
                return (
                    <a className='link__href' href={`skype:${link}?chat`}>{formatHref(link)}</a>
                )
            case 'phone':
                return (
                    <a className='link__href' href={`tel:${link}`}>{formatHref(link)}</a>
                )
            default:
                return (
                    <a className='link__href' href={`${link}`}>{formatHref(link)}</a>
                )
        }
    }

    const formatHref = link => {
        if (link.includes('http://')) {
            link = link.replace('http://', '')
        }
        if (link.includes('https://')) {
            link = link.replace('https://', '')
        }
        if (link.includes('www.')) {
            link = link.replace('www.', '')
        }

        return link
    }

    if (state.isLoading) return <Loader />;
    return (
        <>
            <div className="main__layout__wrapper-header main__header" style={{
                background: state.cover !== null && state.cover !== undefined && state.cover.includes('data') && state.cover !== '' && state.cover !== 'null' ? `center / contain url(${state.cover})` : `${state.cover}`
            }}>
                <Logo onClick={() => window.location = 'http://mysocials.ru/'} />
                <Icon text='☰' style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    width: '20px', height: '20px'
                }} className='button menu-button' onClick={() => setMenu(!menu)} />
                {
                    menu && <div className="dropdown-content visible">
                        <Icon size='17' type='sparkles' style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }} onClick={() => window.open('https://mysocials.ru', '_self')} text='mysocials.ru - на главную' />
                        <Icon type='darts' size='17' style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }} onClick={() => window.open('https://mysocials.ru/#register', '_self')} text='создать профиль' />
                        <Icon type='edit' size='17' style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }} onClick={() => window.open('https://mysocials.ru/#login', '_self')} text='редактировать профиль' />
                    </div>
                }
            </div>

            <div className="main__layout__wrapper-content">
                <div className="main__layout__wrapper-content__left">
                    <div className='avatar' style={{
                        background: state.avatar !== null && state.avatar !== undefined && state.avatar.includes('data') && state.avatar !== '' && state.avatar !== 'null' ? `url(${state.avatar})` : `${state.avatar}`,
                    }}></div>
                    <div className="profile">
                        <div className="profile__name">
                            <div className="profile__name-name">
                                {state.name} {state.verified ? <Icon type='verified' size='20' /> : null}
                            </div>
                            <div className="profile__name-menu edit">
                                <button className="dropbtn">•••</button>
                                <div className="dropdown-content">
                                    <Icon onClick={copyToClipboard} text='Копировать ссылку' />
                                </div>
                            </div>
                        </div>
                        <div className="profile__username">
                            {'@' + state.username}
                        </div>
                        {
                            state.bio !== null && state.bio !== 'null' && <div className="profile__bio">
                                {state.bio}
                            </div>
                        }
                        {
                            state.birthday !== null && state.birthday !== 'null' && <div className="profile__birthday">
                                <Icon type='birthday' size='16' text={state.birthday} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }} />
                            </div>
                        }
                    </div>


                    {/* <div className="left-links">
                        <p><a href='https://mysocials.ru/privacy'>Конфиденциальность</a></p>
                        <p><a href='https://mysocials.ru/'>mysocials.ru</a></p>
                    </div> */}
                </div>
                <div style={{ marginRight: '20px', height: '20px' }}></div>
                <div className="main__layout__wrapper-content__main">
                    <div className="links">
                        {
                            state.links !== 'null' && state.links !== null && state.links !== undefined && state.links.data.map((v, index) => {
                                return (
                                    <div className='link__wrapper profile__link__wrapper' key={index}>
                                        <div className='link__icon profile__link__icon'>
                                            <img src={`img/${state.links.data[index].type}.png`} alt='icon' />
                                        </div>
                                        <div className='link__texts profile__link__texts'>
                                            <div className='link__title'>{v.title}</div>
                                            {formatLink(v.type, v.link)}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
            <div className="left-links">
                <p><a href='https://mysocials.ru/privacy'>Конфиденциальность</a></p>
                <p><a href='https://mysocials.ru/'>mysocials.ru</a></p>
            </div>
        </>
    )
}

export default ProfileScreen