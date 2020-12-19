// import { useEffect } from "react";

const Modal = props => {
    // useEffect(() => {
    //     if (props.isOpened) document.body.classList.add('modal')
    //     return () => document.body.classList.remove('modal')
    // }, [props.isOpened])
    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`}>
            <div className='modal__body'>
                <div className='modal__close' onClick={props.onModalClose}>︿</div>
                <h2>{props.title}</h2>
                <hr />
                {props.children}
            </div>
        </div>
    )
}

export default Modal