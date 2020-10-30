import { useEffect, useReducer } from 'react'
import reducer from '../reducer/reducer';
import Icon from './Icon';
import Loader from './Loader'
import * as actions from '../reducer/actions'

const ProfileScreen = props => {
    const [state, dispatch] = useReducer(reducer, {})

    // let arr = [
    //     'phone',
    //     'ok',
    //     'gitlab',
    //     'tinkoff',
    //     'sberbank',
    //     'yandexmoney',
    //     'hh',
    //     'vc',
    //     'tj',
    //     'dtf',
    //     'habr',
    //     'donationalerts',
    //     'linkedin',
    //     'devianart',
    //     'behance',
    //     'patreon',
    //     'steam',
    //     'twitch',
    //     'skype',
    //     'discord',
    //     'gmail',
    //     'mailru',
    //     'yandexmail',
    //     'email',
    //     'pornhub',
    //     'onlyfans',
    //     'instagram',
    //     'telegram',
    //     'vk',
    //     'facebook',
    //     'viber',
    //     'twitter',
    //     'whatsapp',
    //     'f3cool',
    //     'youtube',
    //     'github',
    //     'tiktok',
    //     'pikabu',
    //     'snapchat',
    //     'askfm',
    //     'epicgames',
    //     'origin',
    //     'xboxlive',
    //     'psn',
    //     'battlenet',
    //     'rockstar',
    //     'uplay',
    // ]

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
                    <a className='link__href' href={`mailto:${link}`}>{link}</a>
                )
            case 'viber':
                return (
                    <a className='link__href' href={`viber://add?number=${link}`}>{link}</a>
                )
            case 'whatsapp':
                return (
                    <a className='link__href' href={`https://api.whatsapp.com/send?phone=${link}`}>{link}</a>
                )
            case 'skype':
                return (
                    <a className='link__href' href={`skype:${link}?chat`}>{link}</a>
                )
            case 'phone':
                return (
                    <a className='link__href' href={`tel:${link}`}>{link}</a>
                )
            default:
                return (
                    <a className='link__href' href={`${link}`}>{link}</a>
                )
        }
    }

    if (state.isLoading) return <Loader />;
    return (
        <>
            <div className="main__layout__wrapper-header" style={{
                background: state.cover !== null && state.cover !== undefined && state.cover.includes('data') && state.cover !== '' && state.cover !== 'null' ? `url(${state.cover})` : `${state.cover}`
            }}></div>
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
                                <Icon type='birthday' size='16' /> {state.birthday}
                            </div>
                        }
                    </div>

                    {/* <div className='settings'>
                        <NavLink to='/settings'><Icon type='settings' size='17' /> Настройки</NavLink>
                    </div> */}

                    <div className="left-links">
                        <p><a href='https://twitter.com/admin'>Конфиденциальность</a></p>
                        <p><a href='https://mysocials.ru/'>mysocials.ru</a></p>
                        {/* <p>1</p> */}
                    </div>
                </div>
                <div style={{ width: '20px', height: '20px' }}></div>
                <div className="main__layout__wrapper-content__main">
                    <div className="links">
                        {
                            state.links !== 'null' && state.links !== null && state.links !== undefined && state.links.data.map((v, index) => {
                                return (
                                    <div className='link__wrapper' key={index}>
                                        <div className='link__icon'>
                                            <img src={`img/${state.links.data[index].type}.png`} alt='icon' />
                                        </div>
                                        <div className='link__texts'>
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
        </>
    )
}

export default ProfileScreen