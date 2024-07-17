//used the same format and way to creating this app as from assignment 5, 6, 7 & 24 hour coding exam
import React, {useState} from "react";
import Axios from "axios";

const UpdateMember = () => {
    const [formData, setFormData] = useState({
        unique_id: "",
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        premium: false
    });

    const handleChange = (e) => {
        const {name, type, value, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            Axios.put("http://localhost:3000/updateMember", formData);
            console.log("Member updated");
            alert("Member updated");
        } catch (error) {
            console.log("Error updating member");
            alert("Error updating member");
        }
    };

    return (
        <div>
            <h1>Update a member</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="unique_id" placeholder="Unique ID" onChange={handleChange} />
                <input type="text" name="title" placeholder="(Mx, Ms, Mr, Mrs, Miss, Dr, Other)" onChange={handleChange} />
                <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <label htmlFor="premium">Premium</label>
                <select id="premium" name="premium" onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <button type="submit">Update Member</button>
            </form>
        </div>
    );
}

export default UpdateMember;