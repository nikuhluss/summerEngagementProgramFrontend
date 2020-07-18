import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import { Button, Nav, Hero, Container, Title, SubTitle, Level, Image } from 'reactbulma';
import { Redirect, NavLink } from "react-router-dom";
import PlannerNavBar from "../components/navbar";
import EventCard from "../components/eventCard";
import BaseModal from "../components/BaseModal";
import EventForm from "../components/EventForm";


function Home(props) {
  const [eventModalState, setEventModal] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44366/api/Sessions", 
    )
    .then(result => {
    if (result.status === 200) {
        setIsLoaded(true);
        console.log(result.data);
        setItems(result.data);
    } else {
        setError(true);
    }
    }).catch(e => {
        console.log(e);
        setIsLoaded(true);
        setError(true);
    });
  }, [])


  const showEventModal = () =>{
    setEventModal(true);
  }

  const hideEventModal = () =>{
    setEventModal(false);
  }

  const appendItem = (newEvent) =>{
    setItems([...items, newEvent]);
  }

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
                <button className="button is-primary" onClick={showEventModal}>Create Event</button>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-two-thirds  mt-6 has-text-centered">
                <h1 className="is-size-2">Currently Offered Events</h1>
                <div className="has-text-left mt-2">
                {items.map((item, i) => ( 
                  <EventCard error={error} isLoaded={isLoaded} item={item} i={i} key={i}/>
                  ))}
                </div>
        </div>
          
        
      </div>
      <BaseModal show={eventModalState} handleClose={hideEventModal}>
        <EventForm handleClose={hideEventModal} appendItem={appendItem}/>
      </BaseModal>
    </div>
  );
}



export default Home;