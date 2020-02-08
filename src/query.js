import gql from "graphql-tag";

export const GET_USER = gql`
  query {
    isLoggedIn @client
    user @client {
      id
      imageUrl
      name
      bio
      location
      website
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`;

export const FEED_QUERY = gql`
  query FeedQuery {
    feed(orderBy: createdAt_DESC) {
      posts {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
          imageUrl
        }
        comments {
          id
          body
          writtenBy {
            name
            imageUrl
          }
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;
