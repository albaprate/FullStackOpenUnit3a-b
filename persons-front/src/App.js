import { useState, useEffect } from "react";
import personService from "./services/persons";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
   personService
   .getAll()
   .then(response => setPersons(response))
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
    let personExists = persons.filter((p) => p.name === newName.trim())

    if (personExists.length !== 0 && newNumber !== '' && newNumber !== personExists[0].number){
      if (window.confirm(` ${newName} is already added to phonebook, replace the old number with a new one?`)){
      const changedPerson = {...personExists[0], number: newNumber}
      personService
      .update(personExists[0].id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== personExists[0].id ? p : returnedPerson ))
      })
      .catch(error => {
        setErrorMessage(
          `Person ${personExists[0].name} was already removed from the server`
        )
      })
      setSuccessfulMessage(`${newName} 's number updated` )
      setTimeout(()=> {
        setSuccessfulMessage(null)
      }, 3000)
    }
    }else if (personExists.length === 0 && newNumber !== '') {
      const p = {
        name: newName,
        number: newNumber
      };

      personService
      .create(p)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName("");
        setNewNumber("");
      })
      setSuccessfulMessage(`Added ${newName}`)

    } else {
      alert(`${newName} is already added to phonebook or he or she already has that number or number is empty`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successfulMessage} type='good'/>
      <Notification message={errorMessage} type='bad'/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
      onSubmit={addPerson}
      nameValue={newName}
      nameChange={handleNameChange}
      numberValue = {newNumber}
      numberChange={handleNumberChange}
      ></PersonForm>
  
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
    </div>
  );
};

export default App;
