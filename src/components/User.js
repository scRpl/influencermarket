import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// GraphQL
const USER_QUERY = gql`
{
  users {
    id
    name
    email
  }
}
`

class User extends Component {
    render() {
        return (
           <Query query={USER_QUERY}>
               {({ loading, error, data }) => {
                   if (loading) return <div>Loading</div>
                   if (error) return <div>Error</div>

                   const users = data.users

                   return (
                       <div>
                           {users.map(user => <div>{user.id}{user.name}{user.email}</div>)}
                       </div>
                   )
               }}
           </Query>)
    }
}

export default User