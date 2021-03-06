import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import { Button, Nav, Hero, Container, Title, SubTitle, Level, Image } from 'reactbulma';
import { Redirect, NavLink } from "react-router-dom";
import PlannerNavBar from "../components/navbar";
import EventCard from "../components/eventCard";
import BaseModal from "../components/BaseModal";
import EventForm from "../components/EventForm";
import ModifyEventForm from "../components/ModifyEventForm";


function Home(props) {
  const [eventModalState, setEventModal] = useState(false);
  const [modifyEvent, setModifyEvent] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [eventToModify, setEventToModify] = useState(null);

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

  const setSessionToModify = (session) =>{
    setEventToModify(session);
  }

  const showEventModal = () =>{
    setEventModal(true);
  }

  const hideEventModal = () =>{
    setEventModal(false);
  }

  const showModifyEvent = () =>{
    setModifyEvent(true);
  }

  const hideModifyEvent  = () =>{
    setModifyEvent(false);
    setEventToModify(null);
  }

  const appendItem = (newEvent) =>{
    setItems([...items, newEvent]);
  }

  return (
    <div className="container">
      

      
      <PlannerNavBar/>
      <div className="columns">
        <div className="column mt-6">
          <div className="tile is-ancestor mt-6">
            <div className="tile is-vertical is-parent mt-2">
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
                  <EventCard 
                    error={error} 
                    isLoaded={isLoaded} 
                    item={item} 
                    i={i} 
                    key={i}
                    showModifyEvent={showModifyEvent}
                    setSessionToModify={setSessionToModify}
                  />
                  ))}
                </div>
        </div>
          
        
      </div>
      <BaseModal show={eventModalState} handleClose={hideEventModal}>
        <EventForm handleClose={hideEventModal} appendItem={appendItem}/>
      </BaseModal>
      <BaseModal show={modifyEvent} handleClose={hideModifyEvent}>
        <ModifyEventForm handleClose={hideModifyEvent} eventToModify={eventToModify}/>
      </BaseModal>
    </div>
  );
}



export default Home;