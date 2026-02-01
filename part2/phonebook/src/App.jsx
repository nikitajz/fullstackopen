import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [notification, setNotification] = useState({ message: null, type: 'success' });

  useEffect(() => {
    personsService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: 'success' }), 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with a new one?`,
        )
      ) {
        personsService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person,
              ),
            );
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${newName}'s number`);
          })
          .catch(() => {
            showNotification(
              `Information of ${newName} has already been removed from server`,
              'error',
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
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
        showNotification(`Added ${returnedPerson.name}`);
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
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .delete(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          showNotification(
            `Information of ${name} has already been removed from server`,
            'error',
          );
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
      <Notification message={notification.message} type={notification.type} />
      <Filter value={filterName} onChange={handleFilterNameChange} />
      <h3>Add a new</h3>
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
