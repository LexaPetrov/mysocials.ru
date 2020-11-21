import Icon from "./Icon"

const Input = props => {

    const renderInput = type => {
        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        name={props.name}
                        className='input__input'
                        placeholder=" "
                        type={props.type}
                        value={props.value}
                        onChange={props.onChange}
                        {...props}
                    />
                )
            default:
                return (
                    <input
                        name={props.name}
                        className='input__input'
                        placeholder=" "
                        type={props.type}
                        value={props.value}
                        onChange={props.onChange}
                        {...props}
                    />
                )
        }
    }


    return (
        <label className='input__label' htmlFor={props.name}>
            {renderInput(props.type)}
            <span className='input__span'>{props.issetting ? <Icon type='edit' size='16' /> : null} {props.inputplaceholder}</span>
        </label>
    )
}

export default Input