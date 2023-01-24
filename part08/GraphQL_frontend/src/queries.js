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
  query ($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      author {
        bookCount
        born
        id
        name
      }
      published
      title
      genres
    }
  }
`;
export const LOGGED_IN_USER = gql`
  query Me {
    me {
      userName
      id
      favoriteGenre
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
export const LOGIN = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      value
    }
  }
`;
