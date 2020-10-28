import { useEffect } from 'react'

const ProfileScreen = props => {
    useEffect(() => {
        document.body.innerHTML +=
            // '<style>.main__layout__wrapper-header { content:url("https://freehtmlthemes.ru/assets/images/articles/css-fon.jpg"); }</style>';
            '<style>.main__layout__wrapper-header { background-image:url("https://freehtmlthemes.ru/assets/images/articles/css-fon.jpg"); }</style>';
        document.body.innerHTML +=
            '<style>.avatar { content:url("https://avatanplus.com/files/photos/original/5abb7079c84321626c2f5bdc.jpg"); }</style>';
    })

    return (
        <div className="main__layout__wrapper-content">
            <div className="main__layout__wrapper-content__left">
                <div className='avatar'></div>
                <div className="profile">
                    <div className="profile__name">
                        <div className="profile__name-name">
                            Admin Admin
                       </div>
                        <div className="profile__name-menu">
                            <button className="dropbtn">•••</button>
                            <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
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
                    📅 01.01.1970
                   </div>
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
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen