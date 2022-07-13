import phoneService from './services/persons';
const Person = ({ person, removeEntry }) => {
    return (
        <>
            {person.name} {person.number} <button onClick={() => removeEntry(person)}>delete</button><br />
        </>
    )
}
export default Person;