import { createSlice } from '@reduxjs/toolkit';
import { createAnecdote, getAll, updateVote } from '../services/anecdote';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createNew(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      return state.map((anecdote) => {
        if (action.payload.id === anecdote.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          };
        }
        return anecdote;
      });
    },
    getAllAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createNew, voteAnecdote, getAllAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initilizeAnecdote = () => {
  return async (dispatch) => {
    const result = await getAll();
    dispatch(getAllAnecdotes(result));
  };
};

export const createNewEntry = (content) => {
  return async (dispatch) => {
    const result = await createAnecdote(content);
    dispatch(createNew(result));
  };
};

export const voteAnec = (content) => {
  const anecdote = {
    ...content,
    votes: content.votes + 1,
  };
  return async (dispatch) => {
    const result = await updateVote(anecdote);
    dispatch(voteAnecdote(result));
  };
};
