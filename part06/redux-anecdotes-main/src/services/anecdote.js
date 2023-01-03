import axios from 'axios';

const baseUrl = ' http://localhost:3001/anecdotes';

export const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

export const createAnecdote = async (entry) => {
  const result = await axios.post(baseUrl, entry);
  return result.data;
};

export const updateVote = async (anecdote) => {
  console.log('🚀 ~ anecdote', anecdote);
  const result = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  console.log('🚀 ~ result', result);
  return result.data;
};
