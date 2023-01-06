import React from 'react';
import styled from 'styled-components'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;

    input {
        margin-left: 10px;
        margin: 10px;
    }

    p {
        color: red;
    }
    .agree {
        color: black;
    }

    button {
        width: 10%;
    }

`;

export default function Form(props) {
    const { change, submit, errors, disabled } = props;
    const { first_name, last_name, email, password, tos } = props.formValues;

    const onChange = event => {
        const { name, value, checked, type } = event.target;
        const newVal = type === 'checkbox' ? checked : value;
        change(name, newVal);
    }

    const onSubmit = event => {
        event.preventDefault();
        submit();
    }
    
    return (
        <StyledForm onSubmit={onSubmit}>

            {errors.first_name ? <p>{errors.first_name}</p> : ""}
            {errors.last_name ? <p>{errors.last_name}</p> : ""}
            {errors.email ? <p>{errors.email}</p> : ""}
            {errors.password ? <p>{errors.password}</p> : ""}
            {errors.tos ? <p>{errors.tos}</p> : ""}


            {/******** NAME *********/}
            <label>First Name
                <input 
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={onChange}
                />
            </label>
            <label>Last Name
            <input 
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={onChange}
                />
            </label>

            {/******** EMAIL *********/}
            <label>Email
            <input 
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChange}
                />
            </label>

            {/******** PASSWORD *********/}
            <label>Password
                <input 
                    type="text"
                    name="password"
                    value={password}
                    onChange={onChange}
                />
            </label>

            {/******** TERMS OF SERVICE *********/}
            <label>Terms of Service
                <p className="agree">Agree
                    <input 
                        type="checkbox"
                        name="tos"
                        checked={tos}
                        onChange={onChange}
                    />
                </p>
            </label>
            <button disabled={disabled} id="submitBtn">submit</button>
        </StyledForm>
    );
}