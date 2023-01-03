import { All_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';
import BirthYear from './BirthYear';

const Authors = (props) => {
  const { error, loading, data } = useQuery(All_AUTHORS);
  console.log('🚀 ~ authors', data);
  if (!props.show) {
    return null;
  }
  if (loading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div>...error!</div>;
  }

  if (!loading && data) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.booksCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <BirthYear />
      </div>
    );
  }
};

export default Authors;
