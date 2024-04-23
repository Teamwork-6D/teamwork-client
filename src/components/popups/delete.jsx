import React from "react";

import './styles.css';

function DeletePopup() {


    function handleYes() {
        console.log('yes delete');
    }

    function handleNo() {
        console.log('no delete');
    }
    return (
        <section>
            <div id="confirmationPopup" className="popup">
                <div class="popup-content">
                    <p>Are you sure?</p>
                    <button id="yesButton" onClick={() => {
                        handleYes()
                    }}>Yes</button>
                    <button id="noButton" onClick={() => {
                        handleNo()
                    }}>No</button>
                </div>
            </div>
        </section>
    )
}

export default DeletePopup;