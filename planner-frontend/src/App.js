import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { AuthContext } from "./context/auth";

import Login from "./pages/Login";
import Signup from './pages/Signup';
import MyEvents from "./pages/MyEvents";

function App(props) {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('tokens') || '');

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }


  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>

        <Router>
          <div>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/events/myevents" component={MyEvents} />
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/admin" component={Admin}/>
          </div>
        </Router>

    </AuthContext.Provider>
  );
}

export default App;