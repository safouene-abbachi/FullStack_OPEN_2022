import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initilizeAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(initilizeAnecdote());
    })();
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
