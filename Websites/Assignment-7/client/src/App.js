import React, {useState} from 'react';
import './App.css';
import '../src/components/css/main.css'; //applies to all the js files in the components folder because of the import in the App.js file (only found out about this now, could have used this in the 24 hour coding exam)

import CreateMember from './components/createMember.js';
import RetrieveMember from './components/retrieveMember.js';
import UpdateMember from './components/updateMember.js';
import DeleteMember from './components/deleteMember.js';

import CreateClass from './components/createClass.js';
import RetrieveClass from './components/retrieveClass.js';
import UpdateClass from './components/updateClass.js';
import DeleteClass from './components/deleteClass.js';

import CreateClassInformation from './components/createClassInformation.js';
import RetrieveClassInformation from './components/retrieveClassInformation.js';
import UpdateClassInformation from './components/editClassInformation.js';
import DeleteClassInformation from './components/deleteClassInformation.js';

const Members = () => {
  return (
    <div className="section">
      <CreateMember />
      <RetrieveMember />
      <UpdateMember />
      <DeleteMember />
    </div>
  );
};

const Classes = () => {
  return (
    <div className="section">
      <CreateClass />
      <RetrieveClass />
      <UpdateClass />
      <DeleteClass />
    </div>
  );
};

const ClassInformation = () => {
  return (
    <div className="section">
      <CreateClassInformation />
      <RetrieveClassInformation />
      <UpdateClassInformation />
      <DeleteClassInformation />
    </div>
  );
};

function App() {
  const [section, setSection] = useState('users');

  const navigation = () => {
    switch (section) {
      case 'members':
        return <Members />;
      case 'classes':
        return <Classes />;
      case 'class-information':
        return <ClassInformation />;
      default:
        return <div><h1>GYM FIT Management System</h1></div>;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setSection('members')}>Members</button>
        <button onClick={() => setSection('classes')}>Classes</button>
        <button onClick={() => setSection('class-information')}>Class Information</button>
      </nav>
      {navigation()}
    </div>
  );
}

export default App;
