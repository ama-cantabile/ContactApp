import React from "react";
import Contact from "../Contact/Contact";
import ContactDataProcess from "../ContactDataProcess/ContactDataProcess";

//Validation data format
const phoneNumberFormat = /^[0-9]{3}[-][0-9]{3}[-][0-9]{4}/;
const birthdayFormat = /[0-9]{2}[/][0-9]{2}/;

var birthData = 0;
var selectedSortOption = "";

class ContactSection extends React.Component {
    constructor() {
        super()
        this.state = {
            currentContact: {
                name: "",
                phoneNumber: "",
                age: "",
                birthday: ""
            },
            error: {
                nameError: "",
                phoneNumberError: "",
                ageError: "",
                birthdayError: ""
            },
            validation: true,
            selectedBirthdayMonth: "",
            selectedSortOption: "",
            contacts: [
                { name: "Nahum Andrzejewski", phoneNumber: "439-898-5225", age: 30, birthday: "01/27" },
                { name: "Urson Milksop", phoneNumber: "508-338-4619", age: 20, birthday: "03/20" },
                { name: "Ally Stealey", phoneNumber: "611-671-8511", age: 40, birthday: "06/10" },
                { name: "Jeff Marzelo", phoneNumber: "829-184-5446", age: 50, birthday: "09/30" }
            ]
        }
        //List of functions for binding.
        this.updateContactName = this.updateContactName.bind(this);
        this.updateContactPhoneNumber = this.updateContactPhoneNumber.bind(this);
        this.updateContactAge = this.updateContactAge.bind(this);
        this.updateContactBirthday = this.updateContactBirthday.bind(this);
        this.updateSelectedBirthdayMonth = this.updateSelectedBirthdayMonth.bind(this);
        this.updateSelectedSortOption = this.updateSelectedSortOption.bind(this);
        this.addContact = this.addContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.editContact = this.editContact.bind(this);
    }

    updateContactName(e) {

        this.nameValidation(e.target.value);

        this.setState({
            currentContact: {
                ...this.state.currentContact,
                name: e.target.value
            }
        })
    }

    updateContactPhoneNumber(e) {

        this.phoneNumberValidation(e.target.value);

        this.setState({
            currentContact: {
                ...this.state.currentContact,
                phoneNumber: e.target.value
            }
        })
    }

    updateContactAge(e) {

        this.ageValidation(e.target.value);

        this.setState({
            currentContact: {
                ...this.state.currentContact,
                age: e.target.value
            }
        })
    }

    updateContactBirthday(e) {

        this.birthdayValidation(e.target.value);

        this.setState({
            currentContact: {
                ...this.state.currentContact,
                birthday: e.target.value
            }
        })
    }

    updateSelectedBirthdayMonth(e) {
        this.setState({
            ...this.state.selectedBirthdayMonth,
            selectedBirthdayMonth: e.target.value
        })
        birthData = this.birthdayDataProcess(e.target.value);
    }

    updateSelectedSortOption(e) {
        this.setState({
            ...this.state.selectedSortOption,
            selectedSortOption: e.target.value
        })
        selectedSortOption = this.sortData(e.target.value);
    }

    //This function will add contact data to the table.
    addContact(e) {
        const newLink = {
            name: this.state.currentContact.name,
            phoneNumber: this.state.currentContact.phoneNumber,
            age: this.state.currentContact.age,
            birthday: this.state.currentContact.birthday
        };
        if (newLink.name.length == 0 || newLink.phoneNumber.length == 0 || newLink.age.length == 0 || newLink.age.length == 0) {
            this.state.validation = false;
            this.state.currentContact.nameError = "This field is required"
        }
        if (this.state.validation != false) {
            this.setState({ contacts: [...this.state.contacts, newLink] });
        }
        this.birthdayDataProcess();
    }

    //This function will delete a selected contact from the table.
    deleteContact(e) {
        const deliteContact = this.state.contacts.filter(item => e.phoneNumber !== item.phoneNumber);
        this.setState({ contacts: deliteContact });
    }

    //This function will edit a selected contact from the table.
    editContact(e) {
        const newLink = {
            name: this.state.currentContact.name,
            phoneNumber: this.state.currentContact.phoneNumber,
            age: this.state.currentContact.age,
            birthday: this.state.currentContact.birthday
        };

        this.nameValidation(newLink.name);
        this.phoneNumberValidation(newLink.phoneNumber);
        this.ageValidation(newLink.age);
        this.birthdayValidation(newLink.birthday);

        if (this.state.validation != false) {
            for (var i = 0; i < this.state.contacts.length; i++) {
                if (e.phoneNumber == this.state.contacts[i].phoneNumber) {
                    this.setState({ ...this.state.contacts[i] = newLink });
                }
            }
        }
    }
    //This is a validation for a name.
    nameValidation(name) {
        if (name.length == 0) {
            this.state.error.nameError = "This field is required";
            this.state.validation = false;
        } else {
            this.state.validation = true;
            this.state.error.nameError = "";
        }
    }

    //This is a validation for a phone number.
    phoneNumberValidation(phonNumber) {
        if (phonNumber.length == 0) {
            this.state.error.phoneNumberError = "This field is required";
            this.state.validation = false;
        } else if (!phonNumber.match(phoneNumberFormat)) {
            this.state.error.phoneNumberError = "Invalid Format";
            this.state.validation = false;
        }
        else {
            this.state.validation = true;
            this.state.error.phoneNumberError = "";
        }
    }

    //This is a validation for an age.
    ageValidation(age) {
        if (age.length == 0) {
            this.state.error.ageError = "This field is required";
            this.state.validation = false;
        } else if (age < 1 || age > 150) {
            this.state.error.ageError = "Enter an age between 1-150";
            this.state.validation = false;
        }
        else {
            this.state.validation = true;
            this.state.error.ageError = "";
        }
    }

    //This is a validation for a birthday.
    birthdayValidation(birthday) {
        if (birthday == 0) {
            this.state.error.birthdayError = "This field is required";
            this.state.validation = false;
        } else if (!(birthday).match(birthdayFormat)) {
            this.state.error.birthdayError = "Invalid Format";
            this.state.validation = false;
        } else if ((birthday.substring(0, 2) < 1) || (birthday.substring(0, 2) > 12) || (birthday.substring(3, 5) > 31) || (birthday.substring(3, 5) < 1)) {
            this.state.error.birthdayError = "Invalid Format";
            this.state.validation = false;
        }
        else {
            this.state.validation = true;
            this.state.error.birthdayError = "";
        }
    }
    //This calculate the minimum age and return it.
    getMimumAge() {
        let minimumAge = 0;
        for (var i = 0; i < this.state.contacts.length; i++) {
            if (minimumAge == 0) {
                minimumAge = this.state.contacts[i].age;
            }
            else if (minimumAge >= this.state.contacts[i].age) {
                minimumAge = this.state.contacts[i].age;
            }
        }
        return minimumAge;
    }
    //This calculate the maximum age and return it.
    getMaximumAge() {
        let maximumAge = 0;
        for (var i = 0; i < this.state.contacts.length; i++) {
            if (maximumAge <= this.state.contacts[i].age) {
                maximumAge = this.state.contacts[i].age;
            }
        }
        return maximumAge;
    }
    //This calculate the average of ages and return it.
    getAverageAge() {
        let averageAge = 0;
        let totalSumOfAge = 0;
        for (var i = 0; i < this.state.contacts.length; i++) {
            totalSumOfAge += parseInt(this.state.contacts[i].age);
        }
        averageAge = totalSumOfAge / this.state.contacts.length;
        return averageAge.toFixed(2);
    }
    //This calculate the number of people who has a birthday in the selected month.
    birthdayDataProcess(birthdayMonth) {
        let counter = 0;

        for (var i = 0; i < this.state.contacts.length; i++) {
            if (this.state.contacts[i].birthday.charAt(0).match("0")) {
                if (this.state.contacts[i].birthday.charAt(1).match(birthdayMonth)) {
                    counter++;
                }
            } else if (this.state.contacts[i].birthday.charAt(0).match("1")) {
                if ((this.state.contacts[i].birthday.substr(0, 2).match(birthdayMonth))) {
                    counter++;
                }
            }
        }

        return counter;
    }

    sortData(selectedSortOption) {
        if (selectedSortOption.match("age")) {
            this.state.contacts.sort(function (a, b) {
                return a.age - b.age;
            });
        } else if (selectedSortOption.match("name")) {
            this.state.contacts.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }
        this.setState(this.state.contacts);
    }

    render() {
        return (
            <div>
                <h3>Contact App:</h3>
                <br />
                <div className="grid-container">
                    <div className="item1">
                        Name: <input type="text" size="30" required onChange={this.updateContactName} ></input>
                        {this.state.error.nameError ? (
                            <div style={{ fontSize: 12, color: "red" }}>{this.state.error.nameError}</div>
                        ) : null}
                        <br />
                Phone number: <input type="text" size="30" required maxLength="12" onChange={this.updateContactPhoneNumber} placeholder={"000-000-0000"}></input>
                        {this.state.error.phoneNumberError ? (
                            <div style={{ fontSize: 12, color: "red" }}>{this.state.error.phoneNumberError}</div>
                        ) : null}
                        <br />
                Age: <input type="text" size="30" required onChange={this.updateContactAge}></input>
                        {this.state.error.ageError ? (
                            <div style={{ fontSize: 12, color: "red" }}>{this.state.error.ageError}</div>
                        ) : null}
                        <br />
                Birthday : <input type="text" size="30" required onChange={this.updateContactBirthday} placeholder={"mm/dd"} ></input>
                        {this.state.error.birthdayError ? (
                            <div style={{ fontSize: 12, color: "red" }}>{this.state.error.birthdayError}</div>
                        ) : null}
                        <br />
                        <button onClick={this.addContact} style={{ backgroundColor: "grey" }} >Add Contact</button>
                    </div>
                    <div className="item2">
                        <ContactDataProcess minimumAge={this.getMimumAge()} maximumAge={this.getMaximumAge()} averageAge={this.getAverageAge()} birthMonthData={birthData}></ContactDataProcess>
                        Select a month : <input type="number" max={12} min={1} onChange={this.updateSelectedBirthdayMonth}></input><br /><br />
                        Sorting Data : <select id="sort" onChange={this.updateSelectedSortOption}>
                            <option value="name">Name</option>
                            <option value="age">Age</option>
                        </select>
                    </div>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Age</th>
                            <th scope="col">Birthday</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contacts.map((item, key) => (
                            <Contact
                                name={item.name}
                                phoneNumber={item.phoneNumber}
                                age={item.age}
                                birthday={item.birthday}
                                deleteAction={() => this.deleteContact(item)}
                                editAction={() => this.editContact(item)}
                                key={key} />))}
                    </tbody>
                </table>
            </div >
        )
    }
}
export default ContactSection