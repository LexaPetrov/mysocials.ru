import { useState } from 'react';
import { backgrounds } from "../utils/backgrounds"
import Logo from "./Logo"
import Icon from './Icon';
import Modal from './Modal';

const Header = props => {
    const [menu, setMenu] = useState(false)
    let bg = props.profilebg ? props.profilebg : backgrounds[12]

    return (
        <div className="main__layout__wrapper-header main__header" style={{
            background: bg
        }}>
            <Logo onClick={() => window.location = 'http://mysocials.ru/'} />
            {
                props.menubutton && (
                    <Icon text='☰' style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        width: '20px', height: '20px'
                    }} className='button menu-button' onClick={() => setMenu(!menu)} />

                )
            }
            <Modal title='Меню' isOpened={menu} onModalClose={() => setMenu(false)}>
                <div className="header__menu__modal">
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
            </Modal>
        </div>
    )
}

export default Header