import React from "react";
import Image from "next/image";
import './style.css'

// Image from https://www.pexels.com/search/network%20switch/
class Maintenance extends React.Component {
    render() {
        return (
            <div className="relative">
                <Image
                    src="/static/underconstruction.jpg"
                    fill 
                    alt="Background Image" 
                    className="background-image"
                />
                <div className="container">
                    <div className="container-text">
                        UNDER CONSTRUCTION
                    </div>
                </div>
            </div>
        );
    }
}

export default Maintenance