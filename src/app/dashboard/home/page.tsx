import { FC } from "react";
import { redirect } from "next/navigation";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  redirect("/dashboard/home/overview");
};

export default Page;
