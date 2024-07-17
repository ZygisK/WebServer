//used the same format and way to creating this app as from assignment 5, 6, 7 & 24 hour coding exam
import React, {useState} from 'react';
import axios from 'axios';

const UpdateClass = () => {
    const [formData, setFormData] = useState({
        class_id: '',
        class_name: '',
        class_day: '',
        sessions_length: '',
        price: '',
        no_of_members: '',
        member_unique_ids: ''
    });

    const handleChange = (e) => {
        const {name, type, value} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? e.target.checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.put('http://localhost:3000/updateClass', formData);
            alert('Class updated');
        } catch (error) {
            console.error('Error updating class', error);
            alert('Error updating class');
        }
    }

    return (
        <div>
            <h1>Update a class</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="class_id" placeholder="Class ID" onChange={handleChange} />
                <input type="text" name="class_name" placeholder="Class Name" onChange={handleChange} />
                <input type="text" name="class_day" placeholder="Class Day" onChange={handleChange} />
                <input type="text" name="sessions_length" placeholder="Sessions Length" onChange={handleChange} />
                <input type="text" name="price" placeholder="Price" onChange={handleChange} />
                <input type="text" name="no_of_members" placeholder="Number of Members" onChange={handleChange} />
                <input type="text" name="member_unique_ids" placeholder="Member Unique IDs" onChange={handleChange} />
                <button type="submit">Update Class</button>
            </form>
        </div>
    );
}

export default UpdateClass;


