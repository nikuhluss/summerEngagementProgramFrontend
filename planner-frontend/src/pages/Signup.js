import React, {useState} from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from "../img/paycom.jpg";
import { Card, Logo, Form, Input, Button, Error } from '../components/AuthForms';
import { useAuth } from "../context/auth";

function Signup() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const data = {
      email: userName,
      firstName: firstName,
      passwordSat: password1,
      passwordHash: password1,
      userDetails:{
          firstName:firstName,
          lastName:lastName
      }
  }

  function checkIfAlreadyExists(){}

  function postRegister() {
      console.log("hello world");
    axios.post("https://localhost:44366/api/Users", 
    data,
    ).then(result => {
      if (result.status === 200) {
          //TODO display page for a second then redirect to login
        return <Redirect to="/login"/>
      } else {
        setIsError(true);
      }
    }).catch(e => {
        console.log(e);
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input type="First Name"
            value={firstName}
            onChange={e=>{
                setFirstName(e.target.value)
            }}
            placeholder="First Name" />
        <Input type="last Name"
        value={lastName}
        onChange={e=>{
            setLastName(e.target.value)
        }}
        placeholder="Last Name" />
        <Input type="email"
            value={userName}
            onChange={e=>{
                setUserName(e.target.value)
            }}
            placeholder="email" />
        <Input type="password"
          value={password1}
          onChange={e => {
            setPassword1(e.target.value);
          }}
          placeholder="password" />
        <Input type="password"
            value={password2}
            onChange={e => {
                setPassword2(e.target.value);
            }}
            placeholder="password again" />
        <Button onClick={postRegister}>Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
      { isError &&<Error>Some information provided was incorrect!</Error> }
    </Card>
  );
}

export default Signup;