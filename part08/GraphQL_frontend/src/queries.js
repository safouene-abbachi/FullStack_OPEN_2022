import { gql } from '@apollo/client';

export const All_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      name
    }
  }
`;
export const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        bookCount
        born
        id
        name
      }
      published
      title
    }
  }
`;
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        born
        name
        id
      }
    }
  }
`;
export const UPDATE_AUTHOR = gql`
  mutation updateBirth($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
