import { useState, useEffect } from 'react'
import Person from './Person';
import phoneService from './services/persons';
import InputForm from './InputForm';
import NameSearch from './NameSearch';
import './index.css';

const Notification = ({ message, classname }) => {
  console.log('message received:', message);
  if (message === null)
    return null;
  return (
    <div className={classname}>
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [classname, setClassname] = useState('');
  const [msg, setMsg] = useState('');


  useEffect(() => {
    phoneService.getAll().then(data => setPersons(data));
  }, []);


  const addNewName = (event) => {
    event.preventDefault();
    let person = persons.find(person => person.name === newName);

    if (person === undefined) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      phoneService.create(personObject).then(data => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
        setMsg(`New person ${newName} with number:${newNumber} is added`);
        setClassname('msg');
        setTimeout(() => {
          setMsg(null)
        }, 5000)
      })


    }
    else {
      if (window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)) {
        //create the object to be modified
        const personObject = {
          id: person.id,
          name: newName,
          number: newNumber
        }
        //Call the update method of the phoneservice
        phoneService.update(person.id, personObject).then(data => {
          setPersons(persons.map(per => per.id !== person.id ? per : data));
          setNewName('');
          setNewNumber('');
          setMsg(`Person ${newName} is updated with a new number:${newNumber}`);
          setClassname('msg');
          setTimeout(() => {
            setMsg(null)
          }, 5000)
        })
          .catch(error => {
            setMsg(`Information of ${newName} has already been removed from the server`);
            setClassname('error');
            setTimeout(() => {
              setMsg(null)
            }, 5000)
          });
      }
    }
  }//AddNewName


  function removeEntry(person) {
    if (window.confirm(`Delete ${person.name} ?`))
      phoneService.deleteEntry(person.id).then(data => setPersons(persons.filter(per => per.id !== person.id)));
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} classname={classname} />
      <div>
        filter shown with: <input value={searchName} onChange={(e) => setSearchName(e.target.value)} onFocus={(e) => e.target.value = ''} />
      </div>
      <h2>add a new</h2>
      <InputForm addNewName={addNewName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <NameSearch searchName={searchName} persons={persons} removeEntry={(person) => removeEntry(person)} />
    </div>
  )
}

export default App 