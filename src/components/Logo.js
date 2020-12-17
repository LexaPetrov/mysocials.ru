

const Logo = props => {

    return (
        <div style={{ maxWidth: '1920px', width: '100%', margin: 'auto' }} onClick={() => window.open('https://mysocials.ru', '_self')}>
            <div style={{ maxWidth: '1130px', margin: 'auto' }}>
                <div className='logo'>
                    <p className='logo__1'>MY</p>
                    <p className='logo__2'>SOCIALS</p>
                    <p className='logo__3'>.RU</p>
                </div>
            </div>
        </div>

    )
}

export default Logo