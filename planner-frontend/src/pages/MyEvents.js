import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import { Button, Nav, Hero, Container, Title, SubTitle, Level, Image } from 'reactbulma';
import { Redirect, NavLink } from "react-router-dom";
import PlannerNavBar from "../components/navbar";
import EventCard from "../components/eventCard";
import BaseModal from "../components/BaseModal";
import EventForm from "../components/EventForm";



function MyEvents(props) {
  const [eventModalState, setEventModal] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44366/api/Users/getUsers/"+localStorage.getItem("userID"), 
    )
    .then(result => {
    if (result.status === 200) {
        setIsLoaded(true);
        console.log(result.data);
        setItems(setSessionArray(result.data.sessionAttendees));
        console.log(items);
    } else {
        setError(true);
    }
    }).catch(e => {
        console.log(e);
        setIsLoaded(true);
        setError(true);
    });
  }, [])

  const setSessionArray = (sessions) =>{
    var array = [];
    for(var i = 0;i<sessions.length;i++){
      array.push(sessions[i].session);
    }
    return array
  }

  const showEventModal = () =>{
    setEventModal(true);
  }

  const hideEventModal = () =>{
    setEventModal(false);
  }

  const appendItem = (newEvent) =>{
    setItems([...items, newEvent]);
  }

  let itemsToRender;
  if(items){
    itemsToRender = items.map((item, i) => ( 
      <EventCard error={error} isLoaded={isLoaded} item={item} i={i} key={i}/>
      ));

    
  } else{
    itemsToRender = "Loading...";
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
                {itemsToRender}
                </div>
        </div>  
      </div>
      <BaseModal show={eventModalState} handleClose={hideEventModal}>
        <EventForm handleClose={hideEventModal} appendItem={appendItem}/>
      </BaseModal>
    </div>
  );
}



export default MyEvents;