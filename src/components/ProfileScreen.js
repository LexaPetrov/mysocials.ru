import { useEffect, useReducer } from 'react'
import { NavLink } from 'react-router-dom'
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
    if(state.isLoading) return <Loader />;
    return (
        <>
            <div className="main__layout__wrapper-header"></div>
            <div className="main__layout__wrapper-content">
                <div className="main__layout__wrapper-content__left">
                    <div className='avatar'></div>
                    <div className="profile">
                        <div className="profile__name">
                            <div className="profile__name-name">
                                Admin Admin
                       </div>
                            <div className="profile__name-menu edit">
                                <button className="dropbtn">•••</button>
                                <div className="dropdown-content">
                                    <a href="https://twitter.com/admin">копировать ссылку</a>
                                    {/* <a href="#">Link 2</a> */}
                                    {/* <a href="#">Link 3</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="profile__username">
                            @admin
                   </div>
                        <div className="profile__bio">
                            Web-scraping (Node.js puppeteer/cheerio, Python beautifulsoup)profpuppeteer/cheerio, Python beautifulsoup)profpuppeteer/cheerio, Python beautifulsoup)profpuppeteer/cheerio, Python beautifulsoup)profpuppeteer/cheerio, Python beautifulsoup)profpuppeteer/cheerio, Python beautifulsoup)profpuppeteer/cheerio, Python beautifulsoup)profpuppeteer/cheerio, Python beautifulsoup)profpuppeteer/cheerio, Python beautifulsoup)profpuppeteer/cheerio, Python beautifulsoup)profile__bioprofile__bioprofile__bioprofile__bioprofile__bioprofile__bio
                   </div>
                        <div className="profile__birthday">
                            <Icon type='birthday' size='16' /> 01.01.1970
                   </div>
                    </div>

                    <div className='settings'>
                        <NavLink to='/settings'><Icon type='settings' size='17' /> Настройки</NavLink>
                    </div>

                    <div className="left-links">
                        <p><a href='https://twitter.com/admin'>Privacy Policy</a></p>
                        <p><a href='https://twitter.com/admin'>SeeMyLinks.ru</a></p>
                        {/* <p>1</p> */}
                    </div>
                </div>
                <div style={{ width: '20px', height: '20px' }}></div>
                <div className="main__layout__wrapper-content__main">
                    <div className="links">
                        {
                            state.links !== null && state.links !== undefined && state.links.data.map((v, index) => {
                                return (
                                    <div className='link__wrapper' key={index}>
                                        <div className='link__icon'>
                                            <img src={`img/${state.links.data[index].type}.png`} alt='icon' />
                                        </div>
                                        <div className='link__texts'>
                                            <div className='link__title'>{v.title}</div>
                                            <a className='link__href' href={`${v.link}`}>{v.link}</a>
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