//used the same format and way to creating this app as from assignment 5, 6, 7 & 24 hour coding exam
import React, {useState} from 'react';
import axios from 'axios';

const CreateClass = () => {
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
        [name]: type === 'number' ? parseInt(value) : value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    try {
        axios.post('http://localhost:3000/createClass', formData);
        console.log('Class created');
        alert('Class created');
    } catch (error) {
        console.log('Error creating class');
        alert('Error creating class');
    }
};

return (
    <div className='createClass'>
        <h1>Create a class</h1>
        <form onSubmit={handleSubmit}>
            <input type='number' name='class_id' placeholder='Class ID' onChange={handleChange} />
            <input type='text' name='class_name' placeholder='Class Name' onChange={handleChange} />
            <input type='text' name='class_day' placeholder='Class Day' onChange={handleChange} />
            <input type='number' name='sessions_length' placeholder='Length (Hours)' onChange={handleChange} />
            <input type='number' name='price' placeholder='Price' onChange={handleChange} />
            <input type='number' name='no_of_members' placeholder='Number of Members' onChange={handleChange} />
            <input type='text' name='member_unique_ids' placeholder='Member Unique IDs' onChange={handleChange} />
            <button type='submit'>Create Class</button>
        </form>
    </div>
);
}

export default CreateClass;