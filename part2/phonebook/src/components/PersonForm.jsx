const PersonForm = ({ person, onSubmit, onNameChange, onNumberChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={person.name} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={person.number} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
