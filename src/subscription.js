import gql from "graphql-tag";

export const NEW_POST = gql`
  subscription {
    newPost {
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
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export const NEW_VOTE = gql`
  subscription {
    newVote {
      id
      user {
        id
      }
      post {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
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
