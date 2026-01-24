const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((item, idx) => (
        <Part key={idx} name={item.name} exercises={item.exercises} />
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
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
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
