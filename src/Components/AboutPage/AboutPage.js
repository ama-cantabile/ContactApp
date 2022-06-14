import React from "react";
import logo from '../../logo.svg';
function AboutPage() {
    return (
        <div className="aboutPageGrid">
            <h2 style={{ textAlign: "left" }}>WHO WE ARE</h2>
            <div>
                <p>
                    Our company found in 1978.
                    We believe there is a better way to do take care of our customers.
                    Our company value our customer at most.
            </p>
            </div>
            <div>
                <p style={{ textAlign: "left" }}>
                    Image goes here
                </p>
                <img src={logo} style={{ backgroundColor: "skyblue" }}>
                </img>
            </div>
        </div>
    )
}

export default AboutPage;