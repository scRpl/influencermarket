import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        bio
        imageUrl
        location
        website
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $confirmedPassword: String!
    $name: String!
    $bio: String!
    $website: String!
    $location: String!
    $imageUrl: String!
  ) {
    signup(
      email: $email
      password: $password
      confirmedPassword: $confirmedPassword
      name: $name
      bio: $bio
      website: $website
      location: $location
      imageUrl: $imageUrl
    ) {
      token
      user {
        id
        name
        email
        bio
        imageUrl
        location
        website
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $bio: String!
    $website: String!
    $location: String!
  ) {
    updateUser(id: $id, bio: $bio, website: $website, location: $location) {
      id
      bio
      website
      location
    }
  }
`;

export const VOTE = gql`
  mutation Vote($postId: ID!) {
    vote(postId: $postId) {
      id
      post {
        id
        votes {
          id
          user {
            id
          }
        }
        postedBy {
          id
        }
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation PostMutation($url: String!, $description: String!) {
    post(url: $url, description: $description) {
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
          name
        }
      }
      comments {
        id
        body
        writtenBy {
          id
          name
          imageUrl
        }
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    comment(postId: $postId, body: $body) {
      id
      body
      writtenBy {
        id
        name
        imageUrl
      }
      post {
        id
      }
    }
  }
`;
