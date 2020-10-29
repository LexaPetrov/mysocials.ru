import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import Input from './Input'
import Loader from './Loader'


const SettingsScreen = props => {
    const [state, setState] = useState({
        id: '',
        password: '',
        email: '',
        name: '',
        username: '',
        bio: '',
        birthday: '',
        verified: false,
        links: {
            data: [
                {
                    title: '',
                    link: '',
                    icon: '',
                    type: 'link'
                }
            ]
        },
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
    }, [state, state.cover, state.avatar])

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
        let arr = [...state.links.data]
        arr.splice(index, 1)
        setState({
            ...state,
            links: { data: arr }
        })
    }

    const addLinkHandler = () => {
        let obj = { ...state.links }
        obj.data.push({
            title: '',
            link: '',
            icon: '',
            type: 'link'
        })
        setState({
            ...state,
            links: obj
        })
    }

    const changeLinkTitleAndLinkAndIcon = (e, index) => {
        let obj = { ...state.links }
        let _title = obj.data[index].title
        if(e.target.name !== 'link'){
            _title = e.target.value
        }
        obj.data[index] = {
            ...obj.data[index],
            [e.target.name]: e.target.value,
            title: _title
        }
        setState({
            ...state,
            links: obj
        })
    }

    if(state.isLoading) return <Loader />;
    return (
        <>
            <div className="main__layout__wrapper-header" style={{
                backgroundImage: state.cover !== '' ? `url(${state.cover})` : null,
                backgroundColor: 'white'
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
                        backgroundColor: 'white'
                    }}>
                        <label className='change__avatar' htmlFor='img__avatar'>
                            <Icon type='camera' size='30' />
                            <input type="file" id="img__avatar" name='img__avatar' style={{ display: 'none' }} onChange={(e) => encodeImageFileAsURL(e, 'avatar')} />
                            фото
                        </label>
                        <label className='change__avatar' onClick={() => setState({ ...state, avatar: '' })}>
                            <Icon type='stop' size='30' />
                        удалить
                        </label>
                    </div>
                    <div className="profile no__sticky">
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
                                    <a href="https://www.google.com/">копировать ссылку</a>
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
                            <Input
                                type='text'
                                placeholder='сменить пароль'
                                isSetting={true}
                                minlength='8'
                                size='24'
                                name='password'
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <div className='settings active no__sticky'>
                        <NavLink to='/settings'><Icon type='settings' size='17' /> Настройки</NavLink>
                    </div>

                    <div className='settings__buttons no__sticky'>
                        <div className='settings button button-success'>
                            <NavLink to='/gfg'><Icon type='save' size='17' /> Сохранить</NavLink>
                        </div>

                        <div className='settings button button-danger'>
                            <NavLink to='/dsxef'><Icon type='cross' size='17' /> Отмена</NavLink>
                        </div>
                    </div>



                    <div className="left-links">
                        <p><a href='https://www.google.com/'>Privacy Policy</a></p>
                        <p><a href='https://www.google.com/'>SeeMyLinks.ru</a></p>
                        {/* <p>1</p> */}
                    </div>
                </div>
                <div style={{ width: '20px', height: '20px' }}></div>
                <div className="main__layout__wrapper-content__main">
                    <div className="links">
                        <Icon type='plus' className='button button-success' size='20' text='Добавить ссылку' style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: 'white'
                        }}
                            onClick={addLinkHandler}
                        />
                        {
                            state.links.data !== undefined && state.links.data.map((val, index) => {
                                return (
                                    <div className='link__wrapper is_settings' key={index}>
                                        <div className='link__icon is_settings'>
                                            <img src={`img/${state.links.data[index].type}.png`} alt='icon' />
                                            <select name='type' className='link__select' value='иконка' onChange={e => changeLinkTitleAndLinkAndIcon(e, index)}>
                                                <option value='иконка' disabled="disabled">иконка</option>
                                                <option value="phone">Телефон</option>
                                                {/*  */}
                                                <option value='мессенджеры' disabled="disabled">мессенджеры</option>
                                                <option value="telegram">Telegram</option>
                                                <option value="viber">Viber</option>
                                                <option value="whatsapp">WhatsApp</option>
                                                {/*  */}
                                                <option value='соцсети' disabled="disabled">соцсети</option>
                                                <option value="vk">VK</option>
                                                <option value="facebook">Facebook</option>
                                                <option value="instagram">Instagram</option>
                                                <option value="ok">Одноклассники</option>
                                                <option value="tiktok">TikTok</option>
                                                <option value="askfm">Ask.fm</option>
                                                <option value="pikabu">Pikabu</option>
                                                <option value="snapchat">Snapchat</option>
                                                <option value="twitter">Twitter</option>
                                                <option value="f3cool">F3.cool</option>
                                                <option value="youtube">YouTube</option>
                                                {/*  */}
                                                <option value='соцсети' disabled="disabled">работа, новости, IT</option>
                                                <option value="hh">Head Hunter</option>
                                                <option value="vc">VC.ru</option>
                                                <option value="tj">tjournal</option>
                                                <option value="dtf">dtf.ru</option>
                                                <option value="habr">Habr</option>
                                                <option value="linkedin">LinkedIn</option>
                                                <option value="github" >Github</option>
                                                <option value="gitlab">Gitlab</option>
                                                <option value="devianart">Devianart</option>
                                                <option value="behance">Behance</option>
                                                {/*  */}
                                                <option value='игры' disabled="disabled">игры, стримы, связь</option>
                                                <option value="steam">Steam</option>
                                                <option value="epicgames">Epic Games</option>
                                                <option value="origin">Origin</option>
                                                <option value="xboxlive">XBox Live</option>
                                                <option value="psn">PSN</option>
                                                <option value="battlenet">Battle.net</option>
                                                <option value="rockstar">RockstarSocial Club</option>
                                                <option value="uplay">Uplay</option>
                                                <option value="twitch">Twitch</option>
                                                <option value="skype">Skype</option>
                                                <option value="discord">Discord</option>
                                                {/*  */}
                                                <option value='почта' disabled="disabled">почта</option>
                                                <option value="gmail">G-mail</option>
                                                <option value="mailru">Mail.ru почта</option>
                                                <option value="yandexmail">Yandex почта</option>
                                                <option value="email">E-mail</option>
                                                {/*  */}
                                                <option value='финансы' disabled="disabled">финансы</option>
                                                <option value="tinkoff">Tinkoff</option>
                                                <option value="sberbank">Сбербанк</option>
                                                <option value="yandexmoney">ЮMoney</option>
                                                <option value="donationalerts">Donation Alerts</option>
                                                <option value="patreon">Patreon</option>
                                                {/*  */}
                                                <option value='18+' disabled="disabled">18+</option>
                                                <option value="pornhub">Pornhub</option>
                                                <option value="onlyfans">Onlyfans</option>
                                            </select>
                                        </div>
                                        <div className='link__texts'>
                                            <div className='link__title'>
                                                <Input
                                                    placeholder={'заголовок'}
                                                    isSetting={true}
                                                    name={'title'}
                                                    value={val.title}
                                                    onChange={e => changeLinkTitleAndLinkAndIcon(e, index)}
                                                />
                                            </div>
                                            <div className='link__href'>
                                                <Input
                                                    placeholder={'вставь ссылку'}
                                                    isSetting={true}
                                                    name={'link'}
                                                    value={val.link}
                                                    onChange={e => changeLinkTitleAndLinkAndIcon(e, index)}
                                                />
                                            </div>
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