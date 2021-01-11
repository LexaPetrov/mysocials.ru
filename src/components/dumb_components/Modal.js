import { useEffect, useRef } from "react";

const Modal = props => {

    let ref = useRef();
    useEffect(() => {
        const el = ref.current;
        if (el) {
            const onWheel = e => {
                e.preventDefault();
                el.scrollTo({
                    top: el.scrollTop + e.deltaY * 4,
                    behavior: "smooth"
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);

    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`} style={{ ...props.style }}>

            <div className='modal__body' ref={ref}>

                <div className='modal__close' onClick={props.onModalClose}>⮾</div>
                {/* <div className='modal__close' onClick={props.onModalClose}><span></span></div> */}
                <h2>{props.title}</h2>
                <hr />
                {props.children}
            </div>
        </div>
    )
}

export default Modal