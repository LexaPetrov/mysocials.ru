
const Layout = props => {

    return(
        <div className="main__layout__wrapper">
            <div className="main__layout__wrapper-header"></div>
            {props.children}
        </div>
    )
}

export default Layout