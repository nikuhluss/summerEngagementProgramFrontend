import React, {useState, useEffect} from "react";
import { Error } from "./AuthForms";
import axios from 'axios';
//import addEvent from "./eventCard";

function EventForm({handleClose}){

    const [isError, setIsError] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const data = {
        title:title,
        description:description,
        organizer:parseInt(localStorage.getItem("userID"),10)
    }

    function postCreateEvent() {
        axios.post("https://localhost:44366/api/Sessions", 
        data,
        ).then(result => {
          if (result.status === 201) {
              console.log(result.status);
              //addEvent(result.data);
              afterPost()
          } else {
            setIsError(true);
          }
        }).catch(e => {
            console.log(e);
          setIsError(true);
        });
      }
    
    function afterPost(){
        setIsError(false);
        setTitle("");
        setDescription("");
        handleClose();
    }

    return(
        <div className="card">
            <div className="card-content">
                <div className="field">
                    <label className="label">Event Title</label>
                    <div className="control">
                        <input 
                            className="input" 
                            value={title}
                            onChange={e => {
                                setTitle(e.target.value);
                            }} 
                            type="text" 
                            placeholder="Title"></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea 
                            className="textarea" 
                            value={description} 
                            onChange={e => {
                                setDescription(e.target.value);
                            }} 
                            type="textarea" 
                            placeholder="Description"></textarea>
                    </div>
                </div>

                
                <button className="button is-primary" onClick={postCreateEvent}>Create Event</button>
            </div>
            { isError &&<Error>Something went wrong!</Error> }



        </div>
    );

}

export default EventForm;