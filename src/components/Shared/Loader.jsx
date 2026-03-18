import React from "react";

import "./Loader.css";

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="loader_screen">
            <div className='lds-ellipsis'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>{message}</p>
        </div>
    );
};

export default Loader;
