import React from 'react';
import { useQuery } from '@apollo/client';
import { LOGGED_IN_USER, ALL_BOOKS } from '../queries';
const FavoriteGenre = ({ show }) => {
  const { error, loading, data } = useQuery(LOGGED_IN_USER);
  const { data: booksData } = useQuery(ALL_BOOKS);

  const favoriteBooks = booksData?.allBooks.filter((book) => {
    return book.genres.includes(data.me.favoriteGenre);
  });
  if (!show) {
    return null;
  }
  if (loading) {
    return <div>...loading!</div>;
  }
  if (error) {
    return <div>...error!</div>;
  }
  if (!loading && data) {
    console.log('🚀 ~ data', data);
    return (
      <div>
        <div>
          Books in your favorite genre <b>{data.me.favoriteGenre}</b>
        </div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {favoriteBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default FavoriteGenre;
