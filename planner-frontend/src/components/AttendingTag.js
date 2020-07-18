import React, { useState } from "react";
import axios from 'axios';

function AttendingTag(props){
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
        return <span className="ml-2 tag is-info">Attending</span>;
    }
    else{
        return null;
    }
    
}

export default AttendingTag;