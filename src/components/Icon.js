const Icon = props => {

    return (
        <span
            className={props.className}
            size={props.size}
            type={props.type}
            style={{
                'alignSelf': 'center',
                verticalAlign: 'middle'
            }}
            onClick={props.onClick}
        >
            <img
                src={'/img/' + props.type + '.png'}
                style={{
                    width: props.size + 'px',
                    height: props.size + 'px'
                }}
                alt='icon'
            />
        </span>
    )
}

export default Icon