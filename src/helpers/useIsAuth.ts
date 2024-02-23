import { GET_PARENT } from "@/gql/queries/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

export const useIsAuth = () => {
  const { data: parent, loading } = useQuery(GET_PARENT);
  const router = useRouter();

  useEffect(()=>{
     const response = parent
     console.log(response)
     if (!loading && response?.parent?.errors !== null) {
      router.push("/signin");
    }
  })
}