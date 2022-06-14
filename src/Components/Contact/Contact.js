import React from "react";

function Contact(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.phoneNumber}</td>
            <td>{props.age}</td>
            <td>{props.birthday}</td>
            <td><button className="btn-primary" onClick={props.deleteAction} style={{backgroundColor:"orange", borderColor:"orange"}}>Delete Contact</button></td>
            <td><button className="btn-primary" onClick={props.editAction} style={{backgroundColor:"orange", borderColor:"orange"}}>Edit Contact</button></td>
        </tr>
    )
}

export default Contact;
