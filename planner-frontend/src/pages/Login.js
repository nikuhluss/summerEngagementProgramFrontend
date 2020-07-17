import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/paycom.jpg";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  //const referer = props.location.state.referer || '/';

    const data = {
        email: userName,
        passwordSat: password
    }

  function postLogin() {
    axios.post("https://localhost:44366/api/Users/verifyUser", 
    data,
    ).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        getUserByEmail(data.email);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
        console.log(e);
      setIsError(true);
    });
  }

  function getUserByEmail(email){
    axios.get("https://localhost:44366/api/Users/getUsersByEmail/"+email, 
    ).then(result => {
      if (result.status === 200) {
        localStorage.setItem('email',result.data.email);
        localStorage.setItem('userID',result.data.id)
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
        <Input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
        { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;