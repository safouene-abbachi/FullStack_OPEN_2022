const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Books = require('./models/books');
const Authors = require('./models/authors');
const User = require('./models/user');
const MONGO_URI =
  'mongodb+srv://safouene:safmongo2022@cluster0.2oe0iau.mongodb.net/?retryWrites=true&w=majority';
const JWT_SECRET = 'classified';
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('connected to mongoDB');
  })
  .catch((error) => {
    console.log('Connexion failed: ' + error.message);
  });

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//     born: 1963,
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//     born: 1821,
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
//   },
// ];

/*

 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *

 */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//     genres: ['agile', 'patterns', 'design'],
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'patterns'],
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'design'],
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'crime'],
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'revolution'],
//   },
// ];

const typeDefs = gql`
  type Authors {
    name: String!
    born: String
    bookCount: Int
    id: ID!
  }
  type Books {
    title: String!
    author: Authors!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type User {
    userName: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books!]!
    allAuthors: [Authors!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Books
    editAuthor(name: String!, setBornTo: Int!): Authors
    createUser(userName: String!, favoriteGenre: String!): User
    login(userName: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Books.collection.countDocuments(),
    authorCount: () => Authors.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        const author = await Authors.findOne({ name: args.author });

        const books = await Books.find({
          author: { $in: author._id },
          genres: { $in: args.genre },
        }).populate('author');
        return books;
      } else if (args.genre) {
        const books = await Books.find({
          genres: { $in: args.genre },
        }).populate('author');
        return books;
      } else if (args.author) {
        const author = await Authors.findOne({ name: args.author });
        const books = await Books.find({
          author: { $in: author._id },
        }).populate('author');
        return books;
      } else {
        return Books.find({}).populate('author');
      }
    },
    allAuthors: async () => await Authors.find({}).populate('books'),
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      console.log('🚀 ~ context', context);
      const currentUser = context.currentUser;
      console.log('🚀 ~ currentUser', currentUser);
      if (!currentUser) {
        throw new UserInputError('user must be logged in!');
      }
      try {
        const existingAuthor = await Authors.findOne({ name: args.author });

        if (!existingAuthor) {
          const newAuthors = new Authors({
            name: args.author,
            born: args.born || null,
            bookCount: 1,
          });
          const newBook = new Books({ ...args, author: newAuthors._id });
          newAuthors.books = [newBook._id];
          await newAuthors.save();
          await newBook.save();
        }
        if (existingAuthor) {
          const authorID = existingAuthor._id;
          const newBook = new Books({ ...args, author: authorID });
          existingAuthor.books = existingAuthor.books.concat(newBook._id);
          existingAuthor.bookCount = existingAuthor.books.length;

          console.log('🚀 ~ existingAuthor', existingAuthor);
          await newBook.save();
          await existingAuthor.save();
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new UserInputError('user must be logged in!');
      }
      try {
        const existingAuthor = await Authors.findOne({ name: args.name });
        if (!existingAuthor) {
          return null;
        }
        existingAuthor.born = args.setBornTo;
        await existingAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      // const updatedAuthors = { ...existingAuthor, born: args.setBornTo };
      // Authors = Authors.map((author) =>
      //   author.name === args.name ? updatedAuthors : author
      // );
      // return updatedAuthors;
    },
    createUser: async (root, args) => {
      console.log('🚀 ~ args', args);
      const newUser = new User({ ...args });
      try {
        await newUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return newUser;
    },
    login: async (root, args) => {
      const user = await User.findOne({ userName: args.userName });
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        userName: user.userName,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req.headers ? req.headers.authorization : null;

    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
