import gql from 'graphql-tag';

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
`

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
      $email: String!, 
      $password: String!, 
      $confirmedPassword: String!, 
      $name: String!,
      $bio: String!,
      $website: String!,
      $location: String!,
      $imageUrl: String!) {
    signup(
    email: $email, 
    password: $password, 
    confirmedPassword: $confirmedPassword, 
    name: $name,
    bio: $bio,
    website: $website,
    location: $location,
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
`

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $bio: String!, $website: String!, $location: String!) {
        updateUser(id: $id, bio: $bio, website: $website, location: $location) {
                id
                bio
                website
                location
        }
    }
`