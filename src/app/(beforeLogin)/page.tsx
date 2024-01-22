import Main from "./_component/Main";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }
  return <Main />;
}

// 로그인을 한 이후에 localhost:3000 로 접근하게 되면 이 페이지로 넘어오는데, 로그인을 한 상태라면 /home 으로 redirect 시켜줌
