import React, { useState } from 'react';
import axios from 'axios';

const RetrieveClass = () => {
    const [classData, setClassData] = useState(null);

    const handleChange = (e) => {
        setClassData(e.target.value);
    };

    const retrieveClass = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/retrieveClass/${classData}`);
            console.log(response.data); //check to see if the data is being retrieved
            setClassData(response.data); // set the class data to the response
        } catch (error) {
            console.error('Error retrieving class', error);
            alert('Error retrieving class');
        }
    };

    return (
        <div>
            <h1>Retrieve a class</h1>
            <p>Retrieve a class by entering the class ID</p>
            <input 
                type='text' 
                name='class_id' 
                placeholder='Class ID' 
                value={classData ? classData.class_id || '' : ''}  //if its not empty, then set the value to the class id
                onChange={handleChange}
            />
            <button onClick={retrieveClass}>Retrieve Class</button>
            {classData && (
                <div>
                    <h2>Class details</h2>
                    <p>Class ID: {classData.class_id}</p>
                    <p>Class Name: {classData.class_name}</p>
                    <p>Class Day: {classData.class_day}</p>
                    <p>Length: {classData.sessions_length}</p>
                    <p>Price: {classData.price}</p>
                    <p>Number of Members: {classData.no_of_members}</p>
                    <p>Member Unique IDs: {classData.member_unique_ids.join(', ')}</p> {/*join the member unique ids, if there are more than one*/}
                </div>
            )}
        </div>
    );
};

export default RetrieveClass;
