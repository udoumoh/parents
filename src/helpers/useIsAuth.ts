import { GET_PARENT } from "@/gql/queries/queries";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

export const useIsAuth = () => {
  const { data: parent, loading } = useQuery(GET_PARENT);
  const router = useRouter();

  useEffect(()=>{
     const response = parent
     if (!loading && !response?.parent?.errors) {
      router.replace("/dashboard/overview");
    }
  })
}