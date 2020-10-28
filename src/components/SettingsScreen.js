import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Input from './Input'


const SettingsScreen = props => {
    const [state, setState] = useState({
        name: '',
        username: '',
        bio: '',
        birthday: '',
        links: [],
        avatar: '',
        cover: ''
    })

    return (
        <div className="main__layout__wrapper-content">
            <div className="main__layout__wrapper-content__left">
                <div className='avatar'></div>
                <div className="profile">
                    <div className="profile__name">
                        <div className="profile__name-name">
                            <Input
                                type='text'
                                placeholder='Имя'
                                isSetting={true}
                                name='change_name'
                                value={state.name}
                            />
                        </div>
                        <div className="profile__name-menu">
                            <button className="dropbtn">•••</button>
                            <div className="dropdown-content">
                                <a href="#">копировать ссылку</a>
                                {/* <a href="#">Link 2</a> */}
                                {/* <a href="#">Link 3</a> */}
                            </div>
                        </div>
                    </div>
                    <div className="profile__username">
                        <Input
                            type='text'
                            placeholder='@username'
                            isSetting={true}
                            name='change_username'
                        />
                    </div>
                    <div className="profile__bio">
                        <Input
                            type='textarea'
                            placeholder='bio'
                            isSetting={true}
                            name='change_bio'
                        />
                    </div>
                    <div className="profile__birthday">
                        <Input
                            type='text'
                            placeholder='Дата рождения'
                            isSetting={true}
                            name='change_birthday'
                        />
                    </div>
                </div>

                <div className='settings active'>
                    <NavLink to='/settings'>⚙ Настройки</NavLink>
                </div>

                <div className='settings__buttons'>
                    <div className='settings settings__save'>
                        <NavLink to='/gfg'>💾 Сохранить</NavLink>
                    </div>

                    <div className='settings settings__cancel'>
                        <NavLink to='/dsxef'>❌ Отмена</NavLink>
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
    )
}

export default SettingsScreen