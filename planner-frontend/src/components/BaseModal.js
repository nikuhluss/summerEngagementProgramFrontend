import React from "react";

function BaseModal({ handleClose, show, children }){
    const showHideClassName = show ? "modal is-active" : "modal";

    return(
        <div className={showHideClassName}>
            <div className="modal-background"></div>
            <div className="modal-content">
                {children}
            </div>
            <button className="modal-close is-large" onClick={handleClose}></button>
        </div>
    );
}

export default BaseModal;