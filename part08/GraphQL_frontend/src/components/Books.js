import { useMemo, useState } from 'react';
import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Books = (props) => {
  const { error, loading, data } = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('all genres');
  const filterByGenre = useMemo(() => {
    if (genre && genre !== 'all genres') {
      return data?.allBooks?.filter((book) => {
        return book.genres.includes(genre);
      });
    }
    if (genre === 'all genres') {
      return data?.allBooks;
    }
  }, [data?.allBooks, genre]);

  const booksGenre = [
    ...new Set(data?.allBooks?.flatMap((books) => books.genres)),
    'all genres',
  ];

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

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filterByGenre.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {booksGenre.map((book) => (
          <button key={book} onClick={() => setGenre(book)}>
            {book}
          </button>
        ))}
      </div>
    );
  }
};

export default Books;
