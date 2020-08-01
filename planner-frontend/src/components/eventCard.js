import React, {useState, useEffect} from "react";
import EventCardFooter from "./EventCardFooter";
import AttendingTag from "./AttendingTag";


function EventCard ({error, isLoaded, item, i, showModifyEvent, setSessionToModify}){
    
    const [attending, setAttending] = useState(null);
    const [owner, setOwner] = useState(null);

    const setIsAttending = () =>{
        setAttending(true);
        console.log("Yessiiiir");
    }

    const setNotAttending = () =>{
        setAttending(false);
        console.log("No ssiiiir");
    }

    const setIsOwner = () =>{
        setOwner(true);
    }

    const setNotOwner = () =>{
        setOwner(false);
    }

    function getAppointmentTime(dateTime){
        var date = new Date(dateTime);
        var correctDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date);
        return correctDate;
    }  
    console.log(item.id);
    if (error) {
    return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
    return <div>Loading...</div>;
    } else if(owner == true && attending == false){
        return null;
    }else{
        return(        
            <div key={i} className="card mb-4">
                <header className="card-header">
                    <p className="card-header-title">
                    {item.title} 
                    <AttendingTag eventID={item.id} attending={attending}/>
                    </p>
                    <a href="#" className="card-header-icon" aria-label="more options">
                    <span className="icon">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                    </a>
                </header>
                <div className="card-content">
                    <div className="content">
                    {item.description}
                    <br />
                        <time dateTime="2016-1-1">
                            {getAppointmentTime(new Date(item.dateHeld))}
                        </time>
                    </div>
                </div>
                <EventCardFooter 
                    eventID={item.id} 
                    setIsAttending={setIsAttending} 
                    setNotAttending={setNotAttending} 
                    attending={attending} 
                    setIsOwner={setIsOwner} 
                    setNotOwner={setNotOwner}
                    owner={owner}
                    showModifyEvent={showModifyEvent}
                    setSessionToModify={setSessionToModify}
                />
            </div>
        );
    }
    
}

export default EventCard;