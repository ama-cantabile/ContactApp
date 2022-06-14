import React from 'react';

function ContactDataProcess(props) {

    return (
        <div>
            <h2>Data Processing</h2>
            <p>Minimum Age: {props.minimumAge}</p>
            <p>Maximum Age: {props.maximumAge}</p>
            <p>Average Age: {props.averageAge}</p>
            <p>Number of people who has a birthday in the following month: {props.birthMonthData}</p>
        </div>
    )
}

export default ContactDataProcess
