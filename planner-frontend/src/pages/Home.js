import React from "react";
import { Button, Nav, Hero, Container, Title, SubTitle, Level, Image } from 'reactbulma';
import { Redirect, NavLink } from "react-router-dom";
import PlannerNavBar from "../components/navbar";
import EventCard from "../components/eventCard";


function Home(props) {
  return (
    <div className="container">
      

      
      <PlannerNavBar/>
      <div className="columns">
        <div className="column">
          <div className="tile is-ancestor mt-5">
            <div className="tile is-vertical is-parent">
              <div className="tile is-child box">
                <p className="title">Event's You're Attending</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
              <div className="tile is-child box">
                <p className="title">Create A New Event</p>
                <button className="button is-primary">Create Event</button>
              </div>
            </div>
          </div>
        </div>
        
          <EventCard/>
        
      </div>
    </div>
  );
}



export default Home;