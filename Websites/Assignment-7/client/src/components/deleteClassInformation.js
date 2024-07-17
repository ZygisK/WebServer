import React, {useState} from 'react';
import axios from 'axios';

const DeleteClassInformation = () => {
    const [classInformationId, setClassInformationId] = useState("");

    const handleChange = (e) => {
        setClassInformationId(e.target.value);
    }

    const deleteClassInformation = async () => {
        try {
            await axios.delete(`http://localhost:3000/deleteClassInformation/${classInformationId}`);
            console.log("Class information deleted");
            alert("Class information deleted");
        }
        catch (error) {
            console.error("Error deleting class information ", error);
            alert("Error deleting class information");
        }
    }

    return (
        <div>
            <h1>Delete Class Information</h1>
            <p>Delete class information by entering its mongodb ID</p>
            <input
                type="text"
                name="class_information id"
                placeholder="Class Information ID"
                value={classInformationId}
                onChange={handleChange}
                />
            <button onClick={deleteClassInformation}>Delete Class Information</button>
        </div>
    );
}

export default DeleteClassInformation;