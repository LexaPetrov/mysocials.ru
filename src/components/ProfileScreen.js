import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from './Icon';

const ProfileScreen = props => {
    //props.canEdit??
    useEffect(() => {
        document.body.innerHTML +=
            // '<style>.main__layout__wrapper-header { content:url("https://freehtmlthemes.ru/assets/images/articles/css-fon.jpg"); }</style>';
            '<style>.main__layout__wrapper-header { background-image:url("https://freehtmlthemes.ru/assets/images/articles/css-fon.jpg"); }</style>';
        document.body.innerHTML +=
            '<style>.avatar { content:url("https://avatanplus.com/files/photos/original/5abb7079c84321626c2f5bdc.jpg"); }</style>';
    })

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
                                    <a href="#">копировать ссылку</a>
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
                        <p><a href=''>Privacy Policy</a></p>
                        <p><a href=''>SeeMyLinks.ru</a></p>
                        {/* <p>1</p> */}
                    </div>
                </div>
                <div style={{ width: '20px', height: '20px' }}></div>
                <div className="main__layout__wrapper-content__main">
                    <div className="links">
                        <div className='link__wrapper'>
                            <div className='link__icon'>
                                <img src='img/github.png' />
                            </div>
                            <div className='link__texts'>
                                <div className='link__title'>Twitter</div>
                                <a className='link__href' href="">https://twitter.com/admin</a>
                            </div>
                        </div>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(v => {
                                return (
                                    <div className='link__wrapper'>
                                        <div className='link__icon'>
                                            <img src='img/github.png' />
                                        </div>
                                        <div className='link__texts'>
                                            <div className='link__title'>Twitter {v}</div>
                                            <a className='link__href' href="">https://twitter.com/admin</a>
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