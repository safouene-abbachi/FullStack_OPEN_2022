import { useState } from 'react';
import { useField } from './hooks';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
  useNavigate,
} from 'react-router-dom';
const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SingleAnecdote = ({ anecdotes }) => {
  const id = useParams().id;
  console.log('🚀 ~ id', id);
  const selectedAnecdote = anecdotes.find((el) => el.id === Number(id));
  return (
    <div>
      <h1>{selectedAnecdote.content}</h1>
      <span>{`has ${selectedAnecdote.votes} votes`}</span>
      <span>
        for more info see :{' '}
        <a href={selectedAnecdote.info}>{selectedAnecdote.info}</a>
      </span>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const navigate = useNavigate();
  const { handleReset: contentReset, ...content } = useField('content');
  const { handleReset: authorReset, ...author } = useField('author');
  const { handleReset: infoReset, ...info } = useField('info');
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate('/');
  };
  const reset = () => {
    contentReset();
    authorReset();
    infoReset();
  };
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);
  const [notification, setNotification] = useState('');
  const [timer, setTimer] = useState(null);

  const showNotification = (message) => {
    if (timer) clearTimeout(timer);
    setNotification(`Successfull creation of ${message}`);
    const timerId = setTimeout(() => {
      setNotification('');
    }, 5000);
    setTimer(timerId);
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    showNotification(anecdote.content);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };
  return (
    <>
      <h1>Software anecdotes</h1>
      {notification && <div style={successStyle}>{notification}</div>}
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route
            path="/anecdote/:id"
            element={<SingleAnecdote anecdotes={anecdotes} />}
          />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
