import React, {useState, useEffect} from "react";

import AttendingTag from "./AttendingTag";


function EventCard ({error, isLoaded, item, i}){
    
    

    //function getAppointmentTime(dateTime){
        //date = new Date(dateTime);
        //correctDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date);
        //return correctDate;
    //}  
    console.log(item.id);
    if (error) {
    return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
    return <div>Loading...</div>;
    }else{
        return(        
            <div key={i} className="card mb-4">
                <header className="card-header">
                    <p className="card-header-title">
                    {item.title} 
                    <AttendingTag eventID={item.id}/>
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
            <time dateTime="2016-1-1">{item.dateHeld}</time>
                    </div>
                </div>
                <footer className="card-footer">
                    <a href="#" className="card-footer-item">Attend</a>
                </footer>
            </div>
        );
    }
    
}

export default EventCard;