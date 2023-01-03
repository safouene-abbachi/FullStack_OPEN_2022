import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ stats, sumFeeds, averageFeeds, positiveFeeds }) => {
  const { good, neutral, bad } = stats;

  return (
    <div>
      <h1>statistics</h1>

      <StatisticLine text={good.text} value={good.value} />
      <StatisticLine text={neutral.text} value={neutral.value} />
      <StatisticLine text={bad.text} value={bad.value} />
      <table>
        <tbody>
          <tr>
            <td>all:</td>
            <td>{sumFeeds() || 'No feedback given'}</td>
          </tr>
          <tr>
            <td>average:</td>
            <td>{averageFeeds() || 'No feedback given'}</td>
          </tr>
          <tr>
            <td>positive:</td>
            <td>
              {' '}
              {positiveFeeds() ? positiveFeeds() + '%' : 'No feedback given'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const statistics = {
    good: {
      text: 'good',
      value: good,
    },
    neutral: {
      text: 'neutral',
      value: neutral,
    },
    bad: {
      text: 'bad',
      value: bad,
    },
  };

  const handleClick = (feed) => {
    switch (feed) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  const averageFeeds = () => {
    const sum = good + neutral + bad;
    const average = (good - bad) / sum;
    return average;
  };

  const sumFeeds = () => {
    const sum = good + neutral + bad;
    return sum;
  };

  const positiveFeeds = () => {
    const pos = (good * 100) / sumFeeds();
    return pos;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick('good')} text="good" />
      <Button handleClick={() => handleClick('neutral')} text="neutal" />
      <Button handleClick={() => handleClick('bad')} text="bad" />
      {good === 0 && neutral === 0 && bad === 0 ? (
        <h1>No feedback given</h1>
      ) : (
        <Statistic
          stats={statistics}
          sumFeeds={sumFeeds}
          averageFeeds={averageFeeds}
          positiveFeeds={positiveFeeds}
        />
      )}
    </div>
  );
};

export default App;
