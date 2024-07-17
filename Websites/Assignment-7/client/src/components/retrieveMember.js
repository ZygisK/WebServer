//used the same format and way to creating this app as from assignment 5, 6, 7 & 24 hour coding exam
import React, {useState} from "react";
import Axios from "axios";

const RetrieveMember = () => {

    const [user, setUser] = useState(null);
    const [uniqueId, setUniqueId] = useState("");

    const handleUniqueIdChange = (event) => {
        setUniqueId(event.target.value);
    };

    const retrieveUser = async () => {
        try {
            const response = await Axios.get(`http://localhost:3000/retrieveMember/${uniqueId}`);
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.log('Error retrieving member', error);
            alert('Error retrieving member');
        }
    };

    return (
        <div>
            <h1>Retrieve a member</h1>
            <p>Retrieve a member by entering their unique ID</p>
            <input 
                type='text' 
                name='unique_id' 
                placeholder='Unique ID' 
                value={uniqueId} 
                onChange={handleUniqueIdChange} 
            />
            <button onClick={retrieveUser}>Retrieve Member</button>
            {user && (
                <div>
                    <h2>Member details</h2>
                    <p>Unique ID: {user.unique_id}</p>
                    <p>Title: {user.title}</p>
                    <p>First Name: {user.first_name}</p>
                    <p>Last Name: {user.last_name}</p>
                    <p>Email: {user.email}</p>
                    <p>Premium: {user.premium ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    );
};

export default RetrieveMember;
