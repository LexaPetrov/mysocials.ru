import * as actions from '../../reducer/actions'
const Layout = props => {
    setInterval(() => {
        if(window.location.pathname === '/settings') {
            actions.is_auth().then(r => r.json()).then(r => {
                if (!r.auth) window.location = '/#login'
            })
        }
    }, 2000)

    return (
        <div className="main__layout__wrapper">
            {props.children}
        </div>
    )
}

export default Layout