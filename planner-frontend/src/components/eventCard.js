import React, {useState, useEffect} from "react";
import axios from 'axios';

function EventCard (){
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    //function getAppointmentTime(dateTime){
        //date = new Date(dateTime);
        //correctDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date);
        //return correctDate;
    //}

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
      }, [items])
    
    if (error) {
    return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
    return <div>Loading...</div>;
    }else{
        return(
            <div className="column is-two-thirds  mt-6 has-text-centered">
                <h1 className="is-size-2">Currently Offered Events</h1>
                <div className="has-text-left mt-2"> 
                    {items.map((item, i) => (
                    <div key={i} className="card mb-4">
                        <header className="card-header">
                            <p className="card-header-title">
                            {item.title}
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
                            <a href="#" className="card-footer-item">Save</a>
                            <a href="#" className="card-footer-item">Edit</a>
                            <a href="#" className="card-footer-item">Delete</a>
                        </footer>
                    </div>
                    ))}
                </div>
            </div>
        );
    }
    
}

export default EventCard;