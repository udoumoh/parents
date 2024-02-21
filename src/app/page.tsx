'use client'
import { useEffect  } from 'react'
import { useRouter } from 'next/navigation'
import { GET_PARENT } from '@/gql/queries/queries'
import { useQuery } from "@apollo/client";


const Home = ({}) => {
  const router = useRouter();
  const { data: parent } = useQuery(GET_PARENT);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = (await parent) || [];
       if (response.parent.errors !== null || !response) {
         router.push("/signin");
       } else {
        router.push("/dashboard/overview")
       }
     } catch (error) {
       console.error("Error fetching data:", error);
       router.push("/signin");
     }
   };
   fetchData();
 }, [parent, router]);
}

export default Home;