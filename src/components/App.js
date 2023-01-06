import logo from '../logo.svg';
import '../App.css';
import Form from './Form.js'
import React, { useState, useEffect } from 'react';
import formSchema from '../validation/formSchema.js';
import axios from 'axios';
import * as yup from "yup";
import styled from 'styled-components';

const Users = styled.div`
  margin: 15px;
  padding: 15px;
  border: 2px solid black;
  border-radius: 10px;
  drop-shadow: 1, 1, 1, 1;
  width: 50%;

  .user {
    border: 2px solid green;
    border-radius: 10px;
    padding: 5px;
    margin: 15px;
  }
`;


function App() {

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    tos: false, // terms of service checkmark
  }

  const initialErrorValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    tos: "", // terms of service checkmark
  }

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrorValues);
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (name, value) => {
    validate(name, value);
    setFormValues({...formValues, [name]: value});
  }
  
  const handleSubmit = () => {
    // WIP
    axios.post('https://reqres.in/api/users', formValues)
      .then(res =>  {
        setUsers([res.data, ...users]);
        console.log(res.data);
      })
      .catch(err => console.error(err));
    setFormValues(initialValues);
  }

  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: ""}))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  useEffect(() => {

    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      });
}, [formValues])

  return (
    <div>
      <Form formValues={formValues} change={handleChange} submit={handleSubmit} disabled={disabled} errors={formErrors} />
      <Users>
        <h3>Users</h3>
        {users.map(user => {
          return <div className="user" key={user.id}>
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}<br/>(Don't worry this is super secure!)</p>
          </div>
        })}
      </Users>
    </div>
  );
}

export default App;
