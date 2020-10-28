
const Input = props => {

    return (
        <label className='input__label' htmlFor={props.name}>
            <input
                name={props.name}
                className='input__input'
                placeholder=" "
                type={props.type}
                value={props.value}
                onChange={props.onChange}
            />
            <span className='input__span'>{props.isSetting ? '✏' : null} {props.placeholder}</span>
        </label>
    )
}

export default Input