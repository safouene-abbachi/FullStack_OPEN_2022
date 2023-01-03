import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnec } from '../reducers/anecdoteReducer';
import { removeNotification, setNotifs } from '../reducers/notificationReducer';
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterValue = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const filtredAnecdotes = () => {
    return anecdotes
      .filter((anecdote) =>
        anecdote.content
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase())
      )
      .sort((a, b) => (a.votes > b.votes ? -1 : 1));
  };

  const vote = (anecdote) => {
    dispatch(voteAnec(anecdote));
    dispatch(setNotifs(`you voted '${anecdote.content}'`, 5));
  };
  return (
    <div>
      {filtredAnecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
