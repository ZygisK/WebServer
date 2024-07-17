import React, { useState } from 'react';
import axios from 'axios';

const CreateClassInformation = () => {
    const [member_unique_ids, setUserID] = useState('');
    const [classIDs, setClassIDs] = useState(['']);

    const handleUserIDChange = (e) => {
        setUserID(e.target.value);
    };

    const handleClassIDChange = (index, e) => {
        const newClassIDs = [...classIDs];
        newClassIDs[index] = e.target.value;
        setClassIDs(newClassIDs);
    };

    const addClassIDInput = () => {
        setClassIDs([...classIDs, '']);
    };

    const createClassInformation = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3000/classInformation`, { member_unique_ids, class_ids: classIDs });
            alert('Class information created');
        } catch (error) {
            console.error("Error creating class information", error);
            alert('Error creating class information');
        }
    };

    return (
        <div>
            <h1>Create Class Information</h1>
            <form onSubmit={createClassInformation}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={member_unique_ids}
                        onChange={handleUserIDChange}
                    />
                </div>
                {classIDs.map((class_id, index) => (
                    <div key={index}>
                        <label>Class ID {index + 1}:</label>
                        <input
                            type="text"
                            placeholder="Class ID"
                            value={class_id}
                            onChange={(e) => handleClassIDChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addClassIDInput}>Add Class ID</button>
                <button type="submit">Create Class Information</button>
            </form>
        </div>
    );
};

export default CreateClassInformation;
