import React, {useState} from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from "../img/paycom.jpg";
import { Card, Logo, Form, Input, Button } from '../components/AuthForms';
import { useAuth } from "../context/auth";

function Signup() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const data = {
      email: userName,
      passwordSat: password
  }

  function postRegister() {
    axios.post("https://localhost:44366/api/Users", 
    data,
    ).then(result => {
      if (result.status === 200) {
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
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Input type="password" placeholder="password again" />
        <Button>Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;