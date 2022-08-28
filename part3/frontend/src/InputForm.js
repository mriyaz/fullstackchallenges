
const InputForm = ({ addNewName, newName, setNewName, newNumber, setNewNumber }) => {
    return (
        <form onSubmit={addNewName}>
            <div>
                name: <input value={newName} onChange={(e) => setNewName(e.target.value)} onFocus={(e) => e.target.value = ''} />
            </div><br />
            <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} onFocus={(e) => e.target.value = ''} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
};

export default InputForm;
