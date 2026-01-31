const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(({ name, number }) => (
        <div key={name}>
          {name} {number}
        </div>
      ))}
    </div>
  );
};

export default Persons;
