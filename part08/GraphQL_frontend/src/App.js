import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient } from '@apollo/client';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  if (!token) {
    return (
      <div>
        <button onClick={() => setPage('login')}>login</button>
        <LoginForm show={page === 'login'} setToken={setToken} />
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => logout()}>logout</button>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
