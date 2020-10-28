import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import Input from './Input'


const SettingsScreen = props => {
    const [state, setState] = useState({
        name: '',
        username: '',
        bio: '',
        birthday: '',
        links: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        // links: [],
        avatar: '',
        cover: ''
    })

    useEffect(() => {
        if (state.cover.length > 666666) {
            alert('Размер изображения не должен превышать 600КБ.')
            setState({ ...state, cover: '' })
        }
        else if (state.avatar.length > 666666) {
            alert('Размер изображения не должен превышать 600КБ.')
            setState({ ...state, avatar: '' })
        }
    }, [state.cover, state.avatar])

    const onInputChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const encodeImageFileAsURL = (e, param) => {
        var file = e.target.files[0];
        var reader = new FileReader();

        if (param === 'cover') {
            reader.onloadend = function () {
                setState({ ...state, cover: reader.result })
            }
        } else {
            reader.onloadend = function () {
                setState({ ...state, avatar: reader.result })
            }
        }

        try {
            reader.readAsDataURL(file);
        } catch { }
    }

    const deleteLinkHandler = (index) => {
        let arr = [...state.links]
        arr.splice(index, 1)
        setState({
            ...state,
            links: arr
        })
    }

    console.log(state);

    return (
        <>
            <div className="main__layout__wrapper-header" style={{
                backgroundImage: state.cover !== '' ? `url(${state.cover})` : '',
                background: 'white'
            }}>
                <label className='change__cover' htmlFor='img__Cover'>
                    <Icon type='camera' size='40' />
                    <input type="file" id="img__Cover" name='img__Cover' style={{ display: 'none' }} onChange={(e) => encodeImageFileAsURL(e, 'cover')} />
                обложка
                </label>
                <label className='change__cover' onClick={() => setState({ ...state, cover: '' })}>
                    <Icon type='stop' size='40' />
                удалить обложку
                </label>
            </div>
            <div className="main__layout__wrapper-content">
                <div className="main__layout__wrapper-content__left">
                    <div className='avatar' style={{
                        backgroundImage: state.avatar !== '' ? `url(${state.avatar})` : '',
                        background: 'white'
                    }}>
                        <label className='change__avatar' htmlFor='img__avatar'>
                            <Icon type='camera' size='30' />
                            <input type="file" name='img__avatar' id="img__avatar" name='img__avatar' style={{ display: 'none' }} onChange={(e) => encodeImageFileAsURL(e, 'avatar')} />
                            фото
                        </label>
                        <label className='change__avatar' onClick={() => setState({ ...state, avatar: '' })}>
                            <Icon type='stop' size='30' />
                        удалить
                        </label>
                    </div>
                    <div className="profile">
                        <div className="profile__name">
                            <div className="profile__name-name">
                                <Input
                                    type='text'
                                    placeholder='Имя'
                                    isSetting={true}
                                    name='name'
                                    value={state.name}
                                    onChange={onInputChange}
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
                                name='username'
                                onChange={onInputChange}
                                value={state.username}
                            />
                        </div>
                        <div className="profile__bio profile__bio__settings">
                            <Input
                                type='textarea'
                                placeholder='bio'
                                isSetting={true}
                                name='bio'
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="profile__birthday">
                            <Input
                                type='date'
                                placeholder='Дата рождения'
                                isSetting={true}
                                name='birthday'
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <div className='settings active'>
                        <NavLink to='/settings'><Icon type='settings' size='17' /> Настройки</NavLink>
                    </div>

                    <div className='settings__buttons'>
                        <div className='settings settings__save'>
                            <NavLink to='/gfg'><Icon type='save' size='17' /> Сохранить</NavLink>
                        </div>

                        <div className='settings settings__cancel'>
                            <NavLink to='/dsxef'><Icon type='cross' size='17' /> Отмена</NavLink>
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
                        {/* <div className='link__wrapper'>
                        <div className='link__icon'>
                            <img src='img/github.png' />
                        </div>
                        <div className='link__texts'>
                            <div className='link__title'>Twitter</div>
                            <a className='link__href' href="">https://twitter.com/admin</a>
                        </div>
                    </div> */}
                        {
                            state.links.map((val, index) => {
                                return (
                                    <div className='link__wrapper is_settings' key={index}>
                                        <div className='link__icon'>
                                            <img src='img/github.png' />
                                        </div>
                                        <div className='link__texts'>
                                            <div className='link__title'>Twitter {index}</div>
                                            <a className='link__href' href="">https://twitter.com/admin</a>
                                            <Icon className='link__delete' size='24' type='stop' onClick={() => deleteLinkHandler(index)} />
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

export default SettingsScreen