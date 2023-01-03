import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer,
  },
});
