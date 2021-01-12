const Icon = props => {

    return (
        <span
            className={props.className}
            size={props.size}
            type={props.type}
            style={{
                'alignSelf': 'center',
                verticalAlign: 'middle',
                cursor: 'pointer',
                ...props.style
            }}
            onClick={props.onClick}
        >
            {
                props.type && <img
                    src={'/img/' + props.type + '.png'}
                    style={{
                        width: props.size + 'px',
                        height: props.size + 'px'
                    }}
                    alt='icon'
                />
            }
            <span style={{ marginLeft:  props.type && '10px', fontSize: props.fz+'px' || '16px' }}>{props.text}</span>
        </span>
    )
}

export default Icon
