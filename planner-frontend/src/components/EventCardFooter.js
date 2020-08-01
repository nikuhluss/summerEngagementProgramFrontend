import React, {useState, useEffect} from "react";
import axios from 'axios';
 
function EventCardFooter(props){

    const eventID = props.eventID;
    const userID = localStorage.getItem("userID");
    const [error, setError] = useState(null);

    function VerifyAttending(){
        const url = "https://localhost:44366/api/SessionAttendees/"+userID+"/"+eventID;
        axios.get(url, 
        )
        .then(result => {
        if (result.status === 200) {
            props.setIsAttending();
        } else {
            setError(true);
            props.setNotAttending();
        }
        }).catch(e => {
            setError(true);
            props.setNotAttending();
        });
    }

    function verifyOwner(){
        const url = "https://localhost:44366/api/Sessions/"+eventID;
        axios.get(url,
        )
        .then(result => {
        if (result.status === 200) {
            if(result.data.organizer == userID){
                props.setIsOwner();
            }
            else{
                props.setNotOwner();
            }
        } else {
            setError(true);
            props.setNotAttending();
        }
        }).catch(e => {
            setError(true);
            props.setNotAttending();
        });
    }

    function cancelAttendance(){
        const url = "https://localhost:44366/api/SessionAttendees/"+userID+"/"+eventID;
        axios.delete(url,
        )
        .then(result => {
        if (result.status === 200) {
            props.setNotAttending();
        } else {
            
        }
        }).catch(e => {
            
        });
    }

    function attendEvent(){
        const url = "https://localhost:44366/api/SessionAttendees";
        var data = {
            userId:userID,
            sessionId:eventID
        }
        axios.post(url,data
        )
        .then(result => {
        if (result.status === 201) {
            props.setIsAttending();
        } else {
            setError(true);
            props.setNotAttending();
        }
        }).catch(e => {
            setError(true);
            props.setNotAttending();
        });
    }

    function cancelEvent(){
        const url = "https://localhost:44366/api/Sessions/"+eventID;
        axios.delete(url,
        )
        .then(result => {
        if (result.status === 200) {
            props.setNotAttending();
        } else {
            setError(true);
            props.setIsAttending();
        }
        }).catch(e => {
            setError(true);
            props.setIsAttending();
        });
    }

    function modifyEvent(){
        const url = "https://localhost:44366/api/Sessions/"+eventID;
        var data = {
            userId:userID,
            sessionId:eventID
        }
        axios.post(url,data
        )
        .then(result => {
        if (result.status === 201) {
            props.setIsAttending();
        } else {
            setError(true);
            props.setNotAttending();
        }
        }).catch(e => {
            setError(true);
            props.setNotAttending();
        });
    }

    function getEvent(){
        axios.get("https://localhost:44366/api/Sessions/"+eventID
            )
            .then(result => {
            if (result.status === 200) {
                props.setSessionToModify(result.data);
            } else {
                setError(true);
                
            }
            }).catch(e => {
                setError(true);
                
            });
    }

    VerifyAttending();
    verifyOwner();
    if(props.attending == true){
        if(props.owner == true){
            return (
                <footer className="card-footer">
                    <button className="card-footer-item button is-danger is-outlined" onClick={cancelEvent}>Cancel Event</button>
                    <button className="card-footer-item button is-primary is-light" onClick={function(){props.showModifyEvent(); getEvent();}}>Modify Event</button>
                </footer>
            );
        }
        else{
            return (
                <footer className="card-footer">
                    <button className="card-footer-item button is-warning is-outlined" onClick={cancelAttendance}>Cancel Attendance</button>
                </footer>
            );
        }
    }
    else if(props.attending == false){
        return (
            <footer className="card-footer">
                <button className="card-footer-item button is-info is-outlined" onClick={attendEvent}>Attend</button>
            </footer>
        );
    }
    return null;
}

export default EventCardFooter;