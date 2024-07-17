import React, {useState} from 'react';
import axios from 'axios';

const RetrieveClassInformation = () => {
    const [classInformation, setClassInformation] = useState([]);

    const retrieveClassInformation = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/retrieveClassInformation`);
            console.log("Class information retrieved:", response.data);
            setClassInformation(response.data);
        }
        catch (error) {
            console.error("Error retrieving class information", error);
            alert("Error retrieving class information");
        }
    }

    return (
        <div>
            <h1>Retrieve Class Information</h1>
            <button onClick={retrieveClassInformation}>Retrieve All Class Information</button>
            {classInformation.length > 0 && (
                <div>
                    {classInformation.map((info, index) => (
                        <div key={index}>
                            <p>ID : {info._id} </p>
                            <p>Class ID: {info.class_ids.join(', ')}</p>
                            <p>Member Unique IDs: {info.member_unique_ids.join(', ')}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RetrieveClassInformation;
