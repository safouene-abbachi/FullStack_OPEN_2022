import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Books = (props) => {
  const { error, loading, data } = useQuery(ALL_BOOKS);
  console.log('🚀 ~ data', data);
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
            {data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Books;
