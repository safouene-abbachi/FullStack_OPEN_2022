import { useState } from 'react';
import { ALL_BOOKS } from '../queries';
import { useLazyQuery, useQuery } from '@apollo/client';

const Books = (props) => {
  const [genre, setGenre] = useState('all genres');
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const [allBooks, { data: refetchedData }] = useLazyQuery(ALL_BOOKS);

  const booksToShow = genre === 'all genres' ? data : refetchedData;

  const booksGenre = [
    ...new Set(data?.allBooks?.flatMap((books) => books.genres)),
    'all genres',
  ];

  const handleChange = (bookGenre) => {
    setGenre(bookGenre);
    allBooks({ variables: { genre: bookGenre } });
  };
  if (!props.show) {
    return null;
  }
  if (loading) {
    return <div>...loading!</div>;
  }
  if (error) {
    return <div>...error!</div>;
  }

  if (!loading && data) {
    return (
      <div>
        <h2>books</h2>
        <p>
          In genre <b>{genre}</b>
        </p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksToShow?.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {booksGenre.map((book) => (
          <button key={book} onClick={() => handleChange(book)}>
            {book}
          </button>
        ))}
      </div>
    );
  }
};

export default Books;
