'use client'
import React, { ReactNode, useEffect } from 'react';
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


// ... (previous imports)

const Layout: React.FC<layoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: parent, loading } = useQuery(GET_PARENT);

  const response = parent || [];
  console.log(response?.parent?.errors);

  // Check for initial redirect when the component mounts
  useEffect(() => {
    if (response?.parent?.errors) {
      router.push("/signin");
    }
  }, [response?.parent?.errors, router]);

  // Use useEffect to handle redirects after the query has been executed
  useEffect(() => {
    if (!loading && !response?.parent?.errors) {
      // Redirect logic after login or successful query
      // For example, redirect to dashboard
      router.push("/dashboard");
    }
  }, [loading, response?.parent?.errors, router]);

  return (
    <MainNav>
      {/* Your layout content */}
      {children}
    </MainNav>
  );
};

export default Layout;
