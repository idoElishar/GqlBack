export const usersTypeDefs = `#graphql

   type LoginResponse {
      user: User
      token: String
      }
    type changePasswordResponse {
        message: String
    }

    type registerResponse{
        success:Boolean
        message:String
        user: User
    }

   input NewUserInput {
     username: String!
     email: String!
     password: String!
     isAdmin: Boolean!
        }
        
    type User{
    _id:String
    username: String 
    email: String 
    password: String
    isAdmin: Boolean
}

  type Query {
    users: [User]
    getUserById(id: String!): User
  }

  type Mutation {
    deleteUser(id: String!): String 
    loginUser(email: String!, password: String!): LoginResponse
    registerUser(newUser: NewUserInput!): registerResponse
    changePassword(email:String!,newPassword:String!):changePasswordResponse
    updateUserById(id: ID!, updatedUserData: NewUserInput!):registerResponse 
  }
    `;