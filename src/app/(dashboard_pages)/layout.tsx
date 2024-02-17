'use client'
import React, { ReactNode } from 'react';
import MainNav from '@/components/navigation/mainNav';
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/navigation';

interface layoutProps {
  children: ReactNode;
}

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


const Layout: React.FC<layoutProps> = ({ children }) => {
  const router = useRouter()
  const { data: parent } = useQuery(GET_PARENT);

  const response = (parent) || []

  if(!response.parent){
    router.push('/signin')
  }
  return (
    <MainNav>
        {/* Your layout content */}
        {children}
    </MainNav>
  );
};

export default Layout;