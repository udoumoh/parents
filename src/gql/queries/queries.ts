import { gql } from "@apollo/client";
export const GET_PARENT = gql(`
query Parent {
  parent {
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
}
`);