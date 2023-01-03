import { gql } from '@apollo/client';

export const All_AUTHORS = gql`
  query {
    allAuthors {
      booksCount
      born
      name
    }
  }
`;
