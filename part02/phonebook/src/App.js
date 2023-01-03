import { useState, useMemo, useEffect, useCallback } from 'react';
import './App.css';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import axios from 'axios';
import { addNote, deletePerson, updateNumber } from './services/personService';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchField, setSearchField] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [notifType, setNotifType] = useState('');
  const baseUrl = 'https://intense-inlet-79535.herokuapp.com/api/persons';
  // const baseUrl = 'http://localhost:3001/api/persons';
  const handleSubmit = (e) => {
    e.preventDefault();
    const existingName = persons.find((person) => person.name === newName);
    console.log('🚀 ~ existingName', existingName);
    if (existingName && existingName?.number !== newNumber) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updateNumber(existingName.id, newNumber)
          .then((updatedPerson) => {
            console.log('🚀 ~ updatedPerson', updatedPerson);
            const updatedPersons = persons.map((person) => {
              if (person.id === updatedPerson.id) {
                return {
                  ...person,
                  number: updatedPerson.number,
                };
              }
              return person;
            });
            setPersons(updatedPersons);
            setNotifType('success');
            setConfirmationMessage(`${newName} number updated`);
            setTimeout(() => {
              setConfirmationMessage('');
            }, 5000);
          })
          .catch((error) => {
            setNotifType('error');
            setConfirmationMessage(`${newName} has already been deleted`);
            setTimeout(() => {
              setConfirmationMessage('');
            }, 5000);
          });
      }
    } else {
      return addNote({ name: newName, number: newNumber })
        .then((response) => {
          setPersons([...persons, response]);
          setNewName('');
          setNewNumber('');
          setNotifType('success');
          setConfirmationMessage(`${newName} added to phonebook`);
          setTimeout(() => {
            setConfirmationMessage('');
          }, 5000);
        })
        .catch((error) => {
          setNotifType('error');
          setConfirmationMessage(error.response.data.error);
          setTimeout(() => {
            setConfirmationMessage('');
          }, 5000);
          // alert(error.response.data.error);
        });
    }
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const filtredPersons = useMemo(() => {
    if (!searchField) {
      return persons;
    }
    return persons.filter((person) => {
      return person?.name?.toLowerCase().includes(searchField.toLowerCase());
    });
  }, [persons, searchField]);

  const handleSearch = (e) => {
    setSearchField(e.target.value);
  };
  console.log({ filtredPersons });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deletePerson(id)
        .then((response) => {
          const deletedPerson = persons.filter((person) => person.id !== id);
          setPersons(deletedPerson);
          setNotifType('success');
          setConfirmationMessage(`${name} deleted`);
          setTimeout(() => {
            setConfirmationMessage('');
          }, 5000);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <Notification
        confirmationMessage={confirmationMessage}
        notifType={notifType}
      />
      <h2>Phonebook</h2>

      <Filter searchField={searchField} handleSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={filtredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
