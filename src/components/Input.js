import Icon from "./Icon"

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
                {...props}
            />
            <span className='input__span'>{props.issetting ? <Icon type='edit' size='16' /> : null} {props.inputplaceholder}</span>
        </label>
    )
}

export default Input