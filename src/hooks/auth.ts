import { gql, useQuery } from "@apollo/client";

const GET_PARENT = gql(`
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
      relationToStudent
      role
      folder
      isDisabled
      profileImgUrl
    }
  }
}
`);

export function useAuth(){
  const { data: parent } = useQuery(GET_PARENT);

  const response = (parent) || [];
  if(response.data) {
    return {isAuthenticated: true}
  }else{
    return {isAuthenticated: false}
  }
}