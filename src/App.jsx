import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added. Replace number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(p =>
                p.id === existingPerson.id ? returnedPerson : p
              )
            )
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }


  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName}
            onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:
          <input value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </p>
      )}

    </div>
  )
}

export default App
