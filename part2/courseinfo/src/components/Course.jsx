const Part = ({ name, exercises }) => {
  return (
    <li>
      {name}: {exercises}
    </li>
  );
};

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Content = (props) => {
  return (
    <div>
      <ul>
        {props.content.map((part) => {
          return (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
          );
        })}
      </ul>
    </div>
  );
};

const Total = ({ content }) => {
  const total = content.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total exercises: {total}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  );
};

export default Course;
