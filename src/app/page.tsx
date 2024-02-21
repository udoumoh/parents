'use client'
import { useEffect  } from 'react'
import { useRouter } from 'next/navigation'
import { GET_PARENT } from '@/gql/queries/queries'
import { useQuery } from "@apollo/client";


const Home = ({}) => {
  const router = useRouter();
  const { data: parent } = useQuery(GET_PARENT);

 useEffect(() => {
   // Check if the parent data has been loaded
   if (parent) {
     try {
       const response = parent || {};

       if (response.parent && response.parent.errors !== null) {
         router.push("/signin");
       }
     } catch (error) {
       console.error("Error fetching data:", error);
       router.push("/signin");
     }
   }
 }, [parent, router]);

 if (!parent) {
   return <p>Loading...</p>;
 }
}

export default Home;