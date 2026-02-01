const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map(({ name, number, id }) => (
        <div key={name}>
          {name} {number}
          <button onClick={() => onDelete({ id, name })}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
