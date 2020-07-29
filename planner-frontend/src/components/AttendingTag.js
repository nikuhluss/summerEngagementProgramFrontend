import React, { useState } from "react";

function AttendingTag(props){

    if(props.attending == true){
        return <span className="ml-2 tag is-info">Attending</span>;
    }
    else{
        return null;
    }
    
}

export default AttendingTag;