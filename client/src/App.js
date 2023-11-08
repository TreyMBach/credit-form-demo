import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // Define state variables for name, age, and credit
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [credit, setCredit] = useState(0);

  // State variable to store the list of people
  const [peopleList, setPeopleList] = useState([]);

  // Function to add a new person when the form is submitted
  const addPerson = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      credit: credit
    }).then(() => {
      console.log("Success");
    });
  }

  // Function to retrieve and display the list of people
  const showPeople = (event) => {
    event.preventDefault();
    axios.get('http://localhost:3001/people').then((response) => {
      setPeopleList(response.data);
      console.log(response.data);
    });
  }

  return (
    <div>
      <header>
        Credit Form
      </header>

      {/* Form for name, age, and credit input */}
      <form>
        <label>
          Name:
          <input type="text"
            value={name}
            onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Age:
          <input type="text"
            value={age}
            onChange={e => setAge(e.target.value)} />
        </label>
        <label>
          Credit:
          <input type="text"
            value={credit}
            onChange={e => setCredit(e.target.value)} />
        </label>
        <button onClick={addPerson}>Add Person</button>
      </form>
      <hr />
      <div className='people'>
        <button onClick={showPeople}>Show People</button>

        {peopleList.map((val, key) => {
          return <div className='person' key={key}>
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Credit: {val.credit}</h3>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
