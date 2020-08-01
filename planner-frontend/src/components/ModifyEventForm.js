import React, {useState, useEffect} from "react";
import { Error } from "./AuthForms";
import axios from 'axios';

function ModifyEventForm({handleClose, eventToModify}){

    const [isError, setIsError] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateHeld, setDateHeld] = useState(null);

    function putModifyEvent() {
        if(title != ""){
            eventToModify.title = title;
        }

        if(description != ""){
            eventToModify.description = description;
        }

        if(dateHeld != ""){
            eventToModify.dateHeld = dateHeld;
        }

        axios.put("https://localhost:44366/api/Sessions/"+eventToModify.id, 
        eventToModify,
        ).then(result => {
          if (result.status === 204) {
              console.log(result.status);
              afterPut();
          } else {
            setIsError(true);
          }
        }).catch(e => {
            console.log(e);
          setIsError(true);
        },[]);
    }

    function afterPut(){
        setIsError(false);
        setTitle("");
        setDescription("");
        setDateHeld(null);
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

                <div className="field">
                    <label className="label">Date and Time</label>
                    <div className="control">
                        <input
                            className="datetime-local" 
                            value={dateHeld} 
                            onChange={e => {
                                setDateHeld(e.target.value);
                            }} 
                            type="datetime-local" 
                            placeholder="Description"></input>
                    </div>
                </div>

                
                <button className="button is-primary" onClick={putModifyEvent}>Edit Event</button>
            </div>
            { isError &&<Error>Something went wrong!</Error> }



        </div>
    );
}

export default ModifyEventForm;