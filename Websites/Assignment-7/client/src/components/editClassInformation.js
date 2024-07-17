//used the same format and way to creating this app as from assignment 5, 6, 7 & 24 hour coding exam
import React, { useState } from 'react';
import axios from 'axios';

const UpdateClassInformation = () => {
    const [id, setId] = useState('');
    const [memberUniqueID, setMemberUniqueID] = useState('');
    const [classIDs, setClassIDs] = useState(['']);

    //update the id
    const handleIDChange = (e) => {
        setId(e.target.value);
    };

    //update the 4 digit member unique id
    const handleMemberUniqueIDChange = (e) => {
        setMemberUniqueID(e.target.value);
    };

    //for changing the class id
    const handleClassIDChange = (index, e) => {
        const newClassIDs = [...classIDs];
        newClassIDs[index] = e.target.value;
        setClassIDs(newClassIDs);
    };


    //add a new class id button
    const addClassIDInput = () => {
        setClassIDs([...classIDs, '']);
    };

    //remove a class id button
    const removeClassIDInput = (index) => {
        const newClassIDs = classIDs.filter((_, i) => i !== index); //.filter removes the conditions that are set in the function, so _, i are the parameters, and i !== index is the condition
        setClassIDs(newClassIDs);
    };

    const updateClassInformation = async () => {
        try {
            await axios.put(`http://localhost:3000/updateClassInformation/${id}`, {
                member_unique_id: memberUniqueID,
                class_ids: classIDs
            });
            console.log("Class information updated");
            alert("Class information updated");
        }
        catch (error) {
            console.error("Error updating class information", error);
            alert("Error updating class information");
        }
    };

    return (
        <div>
            <h1>Update Class Information</h1>
            <input 
                type="text" 
                placeholder="ID of User (mongo)" //using the mongo id
                value={id} 
                onChange={handleIDChange} 
            />
            <input 
                type="text" 
                placeholder="Member Unique ID" 
                value={memberUniqueID} 
                onChange={handleMemberUniqueIDChange} 
            />
            {classIDs.map((classID, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder={`Class ID ${index + 1}`} 
                        value={classID}
                        onChange={(e) => handleClassIDChange(index, e)} //pass in index for the class id
                    />
                    {classIDs.length > 1 && ( 
                        <button type="button" onClick={() => removeClassIDInput(index)}>Remove</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={addClassIDInput}>Add Class ID</button>
            <button onClick={updateClassInformation}>Update Class Information</button>
        </div>
    );
}

export default UpdateClassInformation;
