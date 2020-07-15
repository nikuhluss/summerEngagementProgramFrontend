import React from "react";
import { Button, Nav, Hero, Container, Title, SubTitle, Level, Image } from 'reactbulma';
import logo from "../img/paycom-logo-color-clear.png";
import { Redirect, NavLink } from "react-router-dom";


function Home(props) {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to="/admin">
          
          <img src={logo} alt="Paycom" width="112" height="28" />
          
        </NavLink>
        
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">
            Home
          </NavLink>
          <NavLink to="/events" className="navbar-item">
            Events
          </NavLink>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
            </a>
            <div className="navbar-dropdown">
              <NavLink to="/events/userid" className="navbar-item">
                Your Events
              </NavLink>
              <NavLink to="/events/explore" className="navbar-item">
                Explore Events
              </NavLink>
              <NavLink to="/events/newevent" className="navbar-item">
                Create an Event
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}



export default Home;