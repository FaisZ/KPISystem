import React, { useEffect, useRef } from 'react';

export default function InputInForms({
    type = 'text',
    name,
    value,
    defaultValue,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    hidden
    // state: {value},
}) {
    const input = useRef();

    // onChange(e) {
    //     this.setState({[e.target.name]: e.target.value})
    // }

    // onChange = e => {
    //     this.setState({[e.target.name]: e.target.value})
    // }
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
            hidden={hidden}
                defaultValue={defaultValue}
                type={type}
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                style={{width: "100%", height: "35px"}}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                // onChange={(e) => this.onChange(e)}
            />
        </div>
    );
}
