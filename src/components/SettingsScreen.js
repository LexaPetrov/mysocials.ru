import { useEffect, useReducer, useState, createRef } from 'react'
import Icon from './Icon'
import Input from './Input'
import Loader from './Loader'
import * as actions from '../reducer/actions'
import reducer from '../reducer/reducer'
import { backgrounds } from '../utils/backgrounds.js'
import Header from './Header';
import NotificationSystem from 'react-notification-system';

const SettingsScreen = props => {
    const [state, dispatch] = useReducer(reducer, { ...props.location.state })
    const [tabs, setTabs] = useState({
        tabs: [
            'settings', 'links', 'appearance', 'statistics'
        ],
        active: 'appearance'
    })
    const [settings, setSettings] = useState({
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
                    type: 'link'
                }
            ]
        },
        avatar: '',
        cover: '',
        password_delete: ''
    })

    useEffect(() => {
        try {
            setSettings({
                ...settings,
                ...props.location.state,
                links: props.location.state.links !== undefined && JSON.parse(props.location.state.links),
            })
        } catch {
            window.location = '/'
        }
        // eslint-disable-next-line
    }, [])

    const onInputChange = e => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        })
    }

    const encodeImageFileAsURL = (e, param) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        let sizeKB = e.target.files[0].size / 1024
        if (param === 'cover') {
            reader.onloadend = function () {
                setSettings({ ...settings, cover: reader.result })
            }
        } else {
            reader.onloadend = function () {
                setSettings({ ...settings, avatar: reader.result })
            }
        }

        try {
            if (sizeKB < 601) {
                reader.readAsDataURL(file);
            } else {
                alert('Размер не должен превышать 600 KB')
            }
        } catch { }
    }

    const deleteLinkHandler = (index) => {
        let arr = [...settings.links.data]
        arr.splice(index, 1)
        setSettings({
            ...settings,
            links: { data: arr }
        })
    }

    const addLinkHandler = () => {
        let obj = { data: [] }
        if (settings.links === null || settings.links === 'null') {
            obj = { data: [] }
        } else obj = { ...settings.links }
        if (!obj.data) {
            obj = { data: [] }
        }
        obj.data.push({
            title: '',
            link: '',
            type: 'link'
        })
        setSettings({
            ...settings,
            links: obj
        })
    }

    const changeLinkTitleAndLinkAndIcon = (e, index) => {
        let obj = { ...settings.links }
        let _title = obj.data[index].title
        if (e.target.name !== 'link') {
            _title = e.target.value
        }
        obj.data[index] = {
            ...obj.data[index],
            [e.target.name]: e.target.value,
            title: _title
        }
        setSettings({
            ...settings,
            links: obj
        })
    }

    const onSaveClickHandler = (e) => {
        e.preventDefault()
        actions.save_profile(settings, dispatch)
    }
    const changeBackground = e => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        })
    }

    const generatePlaceholder = (type) => {
        switch (type) {
            case 'gmail': case 'mailru': case 'email': case 'yandexmail': return 'адрес почты'
            case 'viber': case 'whatsapp': case 'phone': return 'номер телефона'
            case 'skype': return 'логин skype'
            default:
                return 'вставь ссылку'
        }
    }

    const onDeleteClickHandler = async () => {
        if (settings.password_delete.length >= 8 && window.confirm(`Удалить аккаунт ${settings.username}? Действие нельзя отменить.`)) {
            await actions.delete_user(settings.username, settings.password_delete, dispatch)

        }
    }

    const upLinkHandler = index => {
        let arr = [...settings.links.data]
        let val = arr[index]
        let nextval = arr[index - 1]
        let temp = ''
        temp = val
        arr[index] = nextval
        arr[index - 1] = temp

        setSettings({
            ...settings,
            links: {
                ...settings.links,
                data: [
                    ...arr
                ]
            }
        })
    }
    const downLinkHandler = index => {
        let arr = [...settings.links.data]
        let val = arr[index]
        let nextval = arr[index + 1]
        let temp = ''
        temp = val
        arr[index] = nextval
        arr[index + 1] = temp

        setSettings({
            ...settings,
            links: {
                ...settings.links,
                data: [
                    ...arr
                ]
            }
        })
    }

    useEffect(() => {
        if (state.notificationmessage && !state.isLoading) {
            notificationSystem.current.addNotification({
                message: state.notificationmessage,
                level: state.success ? 'success' : 'error'
            });
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    useEffect(() => {
        if (state.success_del !== undefined) {
            if (!state.success_del && !state.isLoading) {
                notificationSystem.current.addNotification({
                    message: state.notificationmessage_del,
                    level: 'error'
                });
            }
            if (state.success_del && !state.isLoading) {
                notificationSystem.current.addNotification({
                    message: state.notificationmessage_del,
                    level: 'success'
                });
                setTimeout(() => {
                    window.location = '/'
                }, 3000)
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.success_del])

    let notificationSystem = createRef();
    if (state.isLoading) return <Loader />;
    return (
        <>
            <NotificationSystem ref={notificationSystem} />
            <Header profilebg={settings.cover !== null && settings.cover.includes('data') && settings.cover !== '' && settings.cover !== 'null' ? `center / contain url(${settings.cover})` : `${settings.cover}`} />
            <div className="main__layout__wrapper-content">
                <div className="main__layout__wrapper-content__left">
                    <div className='avatar' style={{
                        background: settings.avatar !== null && settings.avatar.includes('data') && settings.avatar !== '' && settings.avatar !== 'null' ? `url(${settings.avatar})` : `${settings.avatar}`,
                    }}>
                    </div>
                    <div className="profile no__sticky">
                        <div className="profile__name">
                            <div className="profile__name-name">
                                <Input
                                    type='text'
                                    inputplaceholder='Имя'
                                    issetting={"true"}
                                    name='name'
                                    value={settings.name !== null ? settings.name : ''}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <div className="profile__username">
                            <Input
                                type='text'
                                inputplaceholder='@username'
                                issetting={"true"}
                                name='username'
                                onChange={onInputChange}
                                value={settings.username !== null ? settings.username : ''}
                            />
                        </div>
                        <div className='button settings_link'>
                            <a href={'https://mysocials.ru/' + settings.username}>{'https://mysocials.ru/' + settings.username}</a>
                        </div>
                        <div className="profile__bio profile__bio__settings">
                            <Input
                                type='textarea'
                                inputplaceholder='bio'
                                issetting={"true"}
                                name='bio'
                                wrap='hard'
                                rows='7'
                                style={{
                                    boxSizing: 'border-box',
                                    minWidth: '260px',
                                    resize: 'none'
                                }}
                                onChange={onInputChange}
                                value={settings.bio}
                            />
                        </div>
                        <div className="profile__birthday">
                            <Input
                                type='date'
                                inputplaceholder='Дата рождения'
                                issetting={"true"}
                                name='birthday'
                                onChange={onInputChange}
                                value={settings.birthday}
                            />
                        </div>
                    </div>

                    <div className={`settings ${tabs.active === 'appearance' ? 'active' : null} no__sticky`}>
                        <Icon
                            type='picture' size='17' text='Внешний вид' style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                setTabs({
                                    ...tabs, active: 'appearance'
                                })
                            }}
                        />
                    </div>
                    <div className={`settings ${tabs.active === 'links' ? 'active' : null} no__sticky`}>
                        <Icon
                            type='link' size='17' text='Ссылки' style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                setTabs({
                                    ...tabs, active: 'links'
                                })
                            }}
                        />
                    </div>
                    <div className={`settings ${tabs.active === 'statistics' ? 'active' : null} no__sticky`}>
                        <Icon
                            type='chart' size='17' text='Статистика' style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                setTabs({
                                    ...tabs, active: 'statistics'
                                })
                            }}
                        />
                    </div>
                    <div className={`settings ${tabs.active === 'settings' ? 'active' : null} no__sticky`}>
                        <Icon
                            type='settings' size='17' text='Настройки' style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                setTabs({
                                    ...tabs, active: 'settings'
                                })
                            }}
                        />
                    </div>

                    <div className='settings__buttons no__sticky'>
                        <div className='settings button button-success'>
                            <Icon type='save' size='17' text='Сохранить' onClick={e => onSaveClickHandler(e)} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }} />
                        </div>

                        <div className='settings button button-danger'>
                            <Icon type='cross' size='17' text='Отмена' onClick={() => window.location = `/${settings.username}`} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }} />
                        </div>
                    </div>



                    <div className="left-links">
                        <p><a href='/privacy'>Конфиденциальность</a></p>
                        <p><a href='http://mysocials.ru/'>mysocials.ru</a></p>
                    </div>
                </div>
                <div style={{ width: '20px', height: '20px' }}></div>
                <div className="main__layout__wrapper-content__main">
                    <div className={`settings_tab-appearance ${tabs.active === 'appearance' ? 'active-tab' : 'not-active-tab'}`}>
                        <h3>Внешний вид</h3>
                        <h4>Обложка</h4>
                        <hr />
                        <div className='appearance-wrapper'>
                            <label className='change__cover' htmlFor='img__Cover'>
                                <Icon style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }} type='camera' size='20' text='загрузить фото' />
                                <input type="file" id="img__Cover" name='img__Cover' style={{ display: 'none' }} onChange={(e) => encodeImageFileAsURL(e, 'cover')} />
                            </label>
                            <small>(рекомендуемый размер: высота 180px, ширина 1920px и выше)</small>
                            <select className='cover__background__select' name='cover' value='цвет' onChange={e => changeBackground(e)}>
                                <option value='цвет' disabled="disabled">цвет</option>
                                {
                                    backgrounds.map((v, i) => {
                                        return (
                                            <option value={v} key={i}>Цвет {i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className='change__cover' onClick={() => setSettings({ ...settings, cover: '' })}>
                                <Icon style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }} type='stop' size='20' text='удалить обложку' />
                            </label>
                        </div>

                        <h4>Аватар</h4>
                        <hr />
                        <div className='appearance-wrapper'>

                            <label className='change__avatar' htmlFor='img__avatar'>
                                <Icon style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }} type='camera' size='20' text='загрузить фото' />
                                <input type="file" id="img__avatar" name='img__avatar' style={{ display: 'none' }} onChange={(e) => encodeImageFileAsURL(e, 'avatar')} />
                            </label>
                            <select className='avatar__background__select' name='avatar' value='цвет' onChange={e => changeBackground(e)}>
                                <option value='цвет' disabled="disabled">цвет</option>
                                {
                                    backgrounds.map((v, i) => {
                                        return (
                                            <option value={v} key={i}>Цвет {i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className='change__avatar' onClick={() => setSettings({ ...settings, avatar: '' })}>
                                <Icon style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }} type='stop' size='20' text='удалить аватар' />
                            </label>
                        </div>
                    </div>

                    <div className={`settings_tab-statistics ${tabs.active === 'statistics' ? 'active-tab' : 'not-active-tab'}`}>
                        <h3>Статистика</h3>
                    </div>
                    <div className={`settings_tab-settings ${tabs.active === 'settings' ? 'active-tab' : 'not-active-tab'}`}>
                        <h3>Настройки</h3>
                        <h4>Сменить пароль</h4>
                        <hr></hr>
                        <p><small>не забудьте сохранить изменения</small></p>
                        <Input
                            type='text'
                            inputplaceholder='сменить пароль'
                            issetting={"true"}
                            minLength='8'
                            size='24'
                            name='password'
                            onChange={onInputChange}
                        />
                        <h4>Удалить страницу</h4>
                        <hr></hr>
                        <Input
                            type='text'
                            inputplaceholder='введите текущий пароль'
                            minLength='8'
                            size='24'
                            name='password_delete'
                            onChange={onInputChange}
                        />
                        <div className='settings button button-danger'>

                            <Icon type='cross' size='17' text='Удалить страницу' onClick={onDeleteClickHandler} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }} />
                        </div>
                    </div>
                    <div className={`links settings_tab-links ${tabs.active === 'links' ? 'active-tab' : 'not-active-tab'}`}>
                        <h3>Ссылки</h3>

                        <Icon type='plus' className='button button-success' size='20' text='Добавить ссылку' style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                            onClick={addLinkHandler}
                        />
                        {
                            settings.links !== null && settings.links.data !== undefined && settings.links.data.map((val, index) => {
                                return (
                                    <div className='link__wrapper is_settings' key={index}>
                                        <div className='link__icon is_settings'>
                                            <img src={`img/${settings.links.data[index].type}.png`} alt='icon' />
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
                                                <option value="qiwi">QIWI</option>
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
                                                    inputplaceholder={'заголовок'}
                                                    issetting={"true"}
                                                    name={'title'}
                                                    value={val.title !== null ? val.title : ''}
                                                    onChange={e => changeLinkTitleAndLinkAndIcon(e, index)}
                                                />
                                            </div>
                                            <div className='link__href'>
                                                <Input
                                                    inputplaceholder={generatePlaceholder(val.type)}
                                                    issetting={"true"}
                                                    name={'link'}
                                                    value={val.link !== null ? val.link : ''}
                                                    onChange={e => changeLinkTitleAndLinkAndIcon(e, index)}
                                                />
                                            </div>
                                            <Icon className='link__delete' size='24' type='stop' onClick={() => deleteLinkHandler(index)} />
                                            {
                                                index !== 0 && index <= settings.links.data.length - 1 ? (
                                                    <Icon className='link__up' size='24' type='top' onClick={() => upLinkHandler(index)} />
                                                ) : null
                                            }
                                            {
                                                index >= 0 && index !== settings.links.data.length - 1 ? (
                                                    <Icon className='link__down' size='24' type='down' onClick={() => downLinkHandler(index)} />
                                                ) : null
                                            }
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