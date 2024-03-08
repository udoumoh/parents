import { gql } from "@apollo/client";

export const LOGIN_PARENT = gql(`
mutation LoginParent($password: String!, $email: String!) {
  loginParent(password: $password, email: $email) {
    errors {
      field
      message
    }
    parent {
      id
      userId
      status
      isPaid
      isVerified
      isReferred
      agreedTo
      createdAt
      firstName
      middleName
      lastName
      parentRole
      phoneNumber
      email
      role
      folder
      isDisabled
      profileImgUrl
    }
  }
}`);