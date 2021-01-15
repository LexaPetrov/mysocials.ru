import React, { useState, useRef, useEffect } from 'react'

const Scrollable = props => {

    let ref = useRef();
    const [state, setState] = useState({
        isScrolling: false,
        clientX: 0,
        scrollX: 0,
    })

    const onMouseDown = e => {
        if (ref && ref.current && !ref.current.contains(e.target)) {
            return
        }
        e.preventDefault()

        setState({
            ...state, isScrolling: true,
            clientX: e.clientX
        });
    };

    const onMouseUp = e => {
        if (ref && ref.current && !ref.current.contains(e.target)) {
            return
        }
        e.preventDefault()

        setState({ ...state, isScrolling: false });
    };

    const onMouseMove = e => {
        if (ref && ref.current && !ref.current.contains(e.target)) {
            return
        }
        e.preventDefault()
        const { clientX, scrollX } = state;
        if (state.isScrolling) {
            ref.current.scrollLeft = scrollX + e.clientX - clientX;
            let sX = scrollX + e.clientX - clientX;
            let cX = e.clientX;
            setState({
                ...state,
                scrollX: sX,
                clientX: cX
            })
        }
    };



    useEffect(() => {
        document.addEventListener("mousedown", onMouseDown)
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mousemove", onMouseUp)
        return () => {
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mousemove", onMouseUp)
        }
    })

    useEffect(() => {
        const el = ref.current;
        if (el) {
            const onWheel = e => {
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 4,
                    behavior: "smooth"
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);

    //https://valtism.com/src/use-drag-scroll.html
    return (
        <div
            ref={ref}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className={props.rootClass}
        >
            {
                React.Children.map(props.children, child => React.Children.only(child))
            }
        </div>
    )
}

export default Scrollable