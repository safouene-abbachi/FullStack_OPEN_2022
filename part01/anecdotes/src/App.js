import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});
  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };
  const handleVote = (anecdote) => {
    const votesCopy = { ...votes };
    if (votesCopy[anecdote]) {
      votesCopy[anecdote]++;
    } else {
      votesCopy[anecdote] = 1;
    }
    setVotes(votesCopy);
  };

  const mostVotes = () => {
    const entries = Object.entries(votes);
    const maxVote = entries.reduce((a, b) => {
      return a[1] > b[1] ? a : b;
    }, 0);
    return maxVote;
  };
  console.log(mostVotes());
  console.log(Object.keys(votes));
  return (
    <div>
      {anecdotes[selected]}
      <h3> {`has ${votes[anecdotes[selected]] || 0} votes`}</h3>
      <div>
        <button onClick={() => handleVote(anecdotes[selected])}>vote</button>
        <button onClick={() => handleClick()}>Next anecdote</button>
      </div>
      <h1>Anecdote with the most votes</h1>
      {mostVotes() ? (
        <p>{mostVotes()[0] + ' has ' + mostVotes()[1] + ' vote'}</p>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};

export default App;
