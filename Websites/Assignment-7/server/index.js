import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

//MEMBER IMPORTS
import { insertMember } from './crud.js';
import { retrieveMember } from './crud.js';
import { editMember } from './crud.js'
import { deleteMember } from './crud.js'

//CLASS IMPORTS
import { insertClass } from './crud.js';
import { retrieveClass } from './crud.js';
import { editClass } from './crud.js'
import { deleteClass } from './crud.js';

//CLASS INFORMATION IMPORTS
import { createClassInformations } from './crud.js'
import { retrieveClassInformation } from './crud.js'
import { editClassInformation } from './crud.js'
import { deteleClassInformation } from './crud.js'



//I put all my thunderclient body code below for each route, so its easier to test the routes for you and myself.


const app = express();

app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose.connect('mongodb+srv://user:admin@cluster0.9npnhtn.mongodb.net/assignment-6?retryWrites=true&w=majority&appName=Cluster0').then(
    () => {console.log('Connected to MongoDB')},
    err => {console.log('Error connecting to MongoDB')}
);

//MEMBER ROUTES
//create a member
app.post('/createMember', insertMember); //http://localhost:3000/createMember

// {
//     "unique_id": 1009,
//      "title": "Mr",
//     "first_name": "reinas",
//     "last_name": "balakausakas",
//     "email": "reinasboy@example.com",
//     "premium": true
//   }


//retrieve user with id
app.get('/retrieveMember/:unique_id', retrieveMember); //http://localhost:3000/retrieveMember/1006

app.put('/updateMember', editMember) //http://localhost:3000/updateMember

//example of what to update in thunder client
// {
//     "unique_id": 2322, //value of user you want to update
//     "title": "mr",
//     "first_name": "daniel",
//     "last_name": "harp",
//     "email": "forty39@example.com",
//     "premium": true
//  }

app.delete('/deleteMember/:unique_id', deleteMember); //http://localhost:3000/deleteMember/1006





//CLASS ROUTES
//create a class
app.post('/createClass', insertClass); //http://localhost:3000/createClass

// {
//     "class_id": 2322,
//     "class_name": "Yoga Beginners",
//     "class_day": "Wednesday",
//     "sessions_length": 2,
//     "no_of_members": 15,
//     "member_ids": ["663121514fa381590ce8acfb"]
// }

//retrieve class with id
app.get('/retrieveClass/:class_id', retrieveClass); //http://localhost:3000/retrieveClass/2322

app.put('/updateClass', editClass) //http://localhost:3000/updateClass

// {
//     "class_id": 123,
//     "class_name": "updated Swimmers",
//     "class_day": "updated friday",
//     "sessions_length": 4,
//     "no_of_members": 12
//   }

app.delete('/deleteClass/:class_id', deleteClass); //http://localhost:3000/retrieveClass/2322



app.post('/classInformation',createClassInformations)

//regular ID way

// {
//     "member_unique_ids": [2322],
//     "class_ids": [9384]
//   }
  

//with mongoDB ID

// {
//     "user_id": ["663121514fa381590ce8acfb"],
//     "class_id": ["66317656a178e6d62f8633f0"]
//  }

//app.get('/classInformation/:_id',retrieveClassInformation); //http://localhost:3000/classInformation/66322761f28fd3fe43879dc8
app.get('/retrieveClassInformation', retrieveClassInformation);

app.put('/updateClassInformation/:_id', editClassInformation) //http://localhost:3000/updateClassInformation/66322761f28fd3fe43879dc8

// {
//     "member_unique_ids": [342],
//     "class_ids": [432,394]
// }

app.delete('/deleteClassInformation/:_id', deteleClassInformation); //http://localhost:3000/deleteClassInformation/66322761f28fd3fe43879dc8

const __dirname = path.resolve(); // Fix for __dirname not defined in ES module scope
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});




app.listen(3000, () => {
    console.log('Server started on port 3000');
});