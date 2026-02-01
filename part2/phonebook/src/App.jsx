import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personsService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      // alert(`${newName} is already added to phonebook`);
      console.log(`${newName} already exists in phonebook`);

      const existingName = newName;
      if (
        window.confirm(
          `${existingName} is already added to phonebook. Replace the old number with a new number?`,
        )
      ) {
        console.log('Confirmed to update existing person number');

        const existingPersonId = persons.find(
          (person) => person.name === newName,
        ).id;
        personsService
          .update(existingPersonId, { name: existingName, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPersonId ? returnedPerson : person,
              ),
            );
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            console.error(`Error updating person ${existingName}:`, error);
            // alert('Failed to update person');
          });
      }
      return;
    }

    personsService
      .create({ name: newName, number: newNumber })
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName('');
        setNewNumber('');
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleDelete = ({ id, name }) => {
    if (window.confirm(`Delete ${name}`)) {
      personsService.delete(id).then((response) => {
        console.log('delete response:', response);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterNameChange} />
      <h3>add a new</h3>
      <PersonForm
        person={{ name: newName, number: newNumber }}
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
