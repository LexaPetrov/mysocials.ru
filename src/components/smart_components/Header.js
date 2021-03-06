import { useState } from 'react';
import { backgrounds } from "../../utils/backgrounds"
import Logo from "./Logo"
import Icon from '../dumb_components/Icon';
import Modal from '../dumb_components/Modal';

const Header = props => {
    const [menu, setMenu] = useState(false)
    let bg = props.profilebg ? props.profilebg : backgrounds[12]
    return (
        <div className={props.main ? 'header2' : "main__layout__wrapper-header main__header"} style={{
            background: bg
        }}>
            <Logo main={props.main} bg={props.main ? backgrounds[12] : 'transparent'} absolute={!props.main ? ' absolute' : ''} onClick={() => window.location = 'http://mysocials.ru/'} />

            {
                props.menubutton && (
                    <p className='menu-button hover' onClick={() => setMenu(!menu)}  >
                        ☰
                    </p>
                )
            }
            <Modal title='Меню' closeButton isOpened={menu} onModalClose={() => setMenu(false)}>
                <div className="header__menu__modal center fdc">
                    <Icon size='17' className='button hover w100p  button-info  mt10' onClick={() => window.open('https://mysocials.ru', '_self')} text='На главную' />
                    <Icon className='button hover w100p  button-info  mt10' size='17' onClick={() => window.open('https://mysocials.ru/#register', '_self')} text='Создать профиль' />
                    <Icon className='button hover w100p  button-info  mt10' size='17' onClick={() => window.open('https://mysocials.ru/#login', '_self')} text='Редактировать профиль' />
                </div>
            </Modal>
        </div>
    )
}

export default Header
