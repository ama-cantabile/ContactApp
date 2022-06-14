import React from "react";

function HomePage() {
    return (
        <div className="homePageGrid">
            <div>
                <h3 style={{ textAlign: "left" }}>Description:</h3>
                <p style={{ textAlign: "left" }}>This is a contact application where you can save contact information and manage the contact data.</p>
            </div>
            <div>
                <h3 style={{ textAlign: "left" }}>Application functions:</h3>
                <ul style={{ textAlign: "left" }}>
                    <li>Add contact</li>
                    <li>Delete contact</li>
                    <li>Edit contact</li>
                    <li>Sort contact</li>
                    <li>Simple data processing</li>
                </ul>
            </div>
        </div>
    )
}

export default HomePage;