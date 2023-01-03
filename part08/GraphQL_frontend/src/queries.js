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
export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
    }
  }
`;
