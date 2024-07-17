import React, {useState} from "react";
import Axios from "axios";

const DeleteMember = () => {
    const [uniqueId, setUniqueId] = useState("");

    const handleChange = (e) => {
        setUniqueId(e.target.value);
    };
    

    const deleteMember = async () => {
        try {
            await Axios.delete(`http://localhost:3000/deleteMember/${uniqueId}`);
            console.log("Member deleted");
            alert("Member deleted");
        } catch (error) {
            console.log("Error deleting member");
            alert("Error deleting member");
        }
    };

    return (
        <div>
            <h1>Delete a member</h1>
            <p>Delete a member by entering their unique ID</p>
            <input
                type="text"
                name="unique_id"
                placeholder="Unique ID"
                value={uniqueId}
                onChange={handleChange}
            />
            <button onClick={deleteMember}>Delete Member</button>
        </div>
    );
}

export default DeleteMember;