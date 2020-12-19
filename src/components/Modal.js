

const Modal = props => {
    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`}>
            <div className='modal__body'>
                <div className='modal__close' onClick={props.onModalClose}>︿</div>
                <h2>{props.title}</h2>
                {props.children}
            </div>
        </div>
    )
}

export default Modal