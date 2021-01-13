

const Logo = props => {

    return (
        <div style={{ maxWidth: '1920px', width: '100%', margin: 'auto' }} onClick={() => window.open('https://mysocials.ru', '_self')}>
            <div style={{ maxWidth: '1130px', margin: 'auto', position: 'relative' }}>
                <div className={'logo2 hover ' + props.absolute} style={{ background: props.bg }}>
                    <p className='logo2__1'>MY</p>
                    <p className='logo2__2'>SOCIALS</p>
                </div>
            </div>
        </div>

    )
}

export default Logo