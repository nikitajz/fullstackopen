const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({ part, exercise }) => {
  return (
    <>
      <p>
        {part} {exercise}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((item, idx) => (
        <Part key={idx} part={item.part} exercise={item.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts.map((el) => el.exercises).reduce((cur, acc) => cur + acc, 0)}
      </p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      part: "Fundamentals of React",
      exercises: 10,
    },
    {
      part: "Using props to pass data",
      exercises: 7,
    },
    { part: "State of a component", exercises: 14 },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
