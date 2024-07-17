import React, {useState} from 'react';
import axios from 'axios';

const DeleteClass = () => {
    const [classId, setClassId] = useState("");

    const handleChange = (e) => {
        setClassId(e.target.value);
    }

    const deleteClass = async () => {
        try {
            await axios.delete(`http://localhost:3000/deleteClass/${classId}`);
            console.log("Class deleted");
            alert("Class deleted");
        } catch (error) {
            console.error("Error deleting class", error);
            alert("Error deleting class");
        }
    }

    return (
        <div>
            <h1>Delete a class</h1>
            <p>Delete a class by entering its ID</p>
            <input
                type="text"
                name="class_id"
                placeholder="Class ID"
                value={classId}
                onChange={handleChange}
                />
            <button onClick={deleteClass}>Delete Class</button>
        </div>
    );
}

export default DeleteClass;
