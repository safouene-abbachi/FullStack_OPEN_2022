import React from 'react';
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { createNewEntry } from '../reducers/anecdoteReducer';
import { setNotifs } from '../reducers/notificationReducer';
const AnecdoteForm = (props) => {
  const createNewAnecdote = async (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    props.createNewEntry({ content: newAnecdote, votes: 0 });
    props.setNotifs(`You just created '${e.target.anecdote.value}'`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createNewEntry,
  setNotifs,
};
const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedForm;
