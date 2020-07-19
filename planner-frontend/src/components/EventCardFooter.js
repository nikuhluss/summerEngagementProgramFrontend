import React, {useState, useEffect} from "react";
import axios from 'axios';
 
function EventCardFooter(props){

    const eventID = props.eventID;
    const userID = localStorage.getItem("userID");
    const [attending, setAttending] = useState(false);
    const [error, setError] = useState(null);

    function VerifyAttending(){
        const url = "https://localhost:44366/api/SessionAttendees/"+userID+"/"+eventID;
        axios.get(url, 
        )
        .then(result => {
        if (result.status === 200) {
            setAttending(true);
        } else {
            setError(true);
        }
        }).catch(e => {
            setError(true);
        });
    }

    VerifyAttending();
    if(attending == true){
        return (
            <footer className="card-footer has-background-danger-light">
                <a href="#" className="card-footer-item  has-text-danger">Delete</a>
            </footer>
        );
    }
    else{
        return (
            <footer className="card-footer">
                <a href="#" className="card-footer-item">Attend</a>
            </footer>
        );
    }
    
}

export default EventCardFooter;