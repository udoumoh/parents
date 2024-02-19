'use client'
import { FC, useEffect  } from 'react'
import { redirect } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { GET_PARENT } from '@/gql/queries/queries'
import { useQuery } from "@apollo/client";


const Home = ({}) => {
  const path = usePathname();
  const router = useRouter();
  const { data: parent } = useQuery(GET_PARENT);
  const isPublicRoute = ["/signin", "/signup", "/verifyotp"].includes(path);

  const response = parent || [];
  console.log(response?.parent?.errors);

  // Check for initial redirect when the component mounts
  useEffect(() => {
    if (response?.parent?.errors) {
      redirect("/signin");
    } else {
      redirect("/dashboard/overview");
    }
  }, [response?.parent?.errors, router, isPublicRoute]);
}

export default Home;