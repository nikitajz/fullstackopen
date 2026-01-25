import { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, count }) => (
  <tr>
    <td>{text}</td>
    <td>{count}</td>
  </tr>
);

const allFeedback = ({ good, neutral, bad }) => good + neutral + bad;
// the feedback values are: good 1, neutral 0, bad -1
const avgFeedback = (stats) => {
  const total = allFeedback(stats);
  if (total === 0) return 0;
  const { good, neutral, bad } = stats;
  return (good * 1 + neutral * 0 + bad * -1) / total;
};
const positiveFeedback = (stats) => {
  const total = allFeedback(stats);
  if (total === 0) return 0;
  return (stats.good / total) * 100;
};

const Statistics = ({ stats }) => {
  const total = allFeedback(stats);
  if (total === 0) return 'No feedback given';
  return (
    <table>
      <tbody>
        <StatisticLine text="good" count={stats.good} />
        <StatisticLine text="neutral" count={stats.neutral} />
        <StatisticLine text="bad" count={stats.bad} />
        <StatisticLine text="all" count={total} />
        <StatisticLine text="average" count={avgFeedback(stats)} />
        <StatisticLine text="positive" count={positiveFeedback(stats) + ' %'} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = { good, neutral, bad };

  return (
    <div>
      <Header title="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header title="statistics" />
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
