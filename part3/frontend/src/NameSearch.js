
import { nanoid } from 'nanoid';
import Person from './Person';
const NameSearch = ({ searchName, persons, removeEntry }) => {
    return (
        searchName === '' ? persons
            .map(person => <Person key={nanoid()} person={person} removeEntry={(person) => removeEntry(person)} />) : persons
                .filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
                .map(person => <Person key={nanoid()} person={person} removeEntry={(person) => removeEntry(person)} />)
    )
}

export default NameSearch;