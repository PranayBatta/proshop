import React, { Component } from "react";
import "../css/Loader.css";
export default class loader extends Component {
    render() {
        return (
        <>
            <div className="dotcontainer">
                <div className="dot dot1"></div>
                <div className="dot dot2"></div>
                <div className="dot dot3"></div>
            </div>
        </>
        );
    }
}
