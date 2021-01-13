

const Logo = props => {
    return (
        <div style={{ maxWidth: '1920px', width: '100%', margin: 'auto' }} onClick={() => window.open('https://mysocials.ru', '_self')}>
            <div style={{ maxWidth: '1130px', margin: 'auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div className={'logo2 hover ' + props.absolute} style={{ background: props.bg }}>
                    <p className='logo2__1'>MY</p>
                    <p className='logo2__2'>SOCIALS </p>
                </div>
                {
                    props.main && (
                        <div className='header__links'>
                            <a href='/#register' style={{marginRight: 'auto'}}>создать страницу</a>
                            <a href='/#login'>войти</a>
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default Logo