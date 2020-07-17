import React, {Component} from "react";
import { Button, Nav, Hero, Container, Title, SubTitle, Level, Image } from 'reactbulma';
import logo from "../img/paycom-logo-color-clear.png";
import { Redirect, NavLink } from "react-router-dom";

function PlannerNavBar(){
    
    return (
        <nav className="navbar container mt-5" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <NavLink to="/admin">
              
              <img src={logo} className="mt-3 ml-1" alt="Paycom" width="112" height="28" />
              
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
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Events
                </a>
                <div className="navbar-dropdown">
                  <NavLink to="/events/userid" className="navbar-item">
                    Your Events
                  </NavLink>
                  <NavLink to="/events/explore" className="navbar-item">
                    Explore Events
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
    
}

export default PlannerNavBar;