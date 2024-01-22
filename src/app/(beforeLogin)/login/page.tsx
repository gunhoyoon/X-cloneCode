"use client";
import { useRouter } from "next/navigation";
import Main from "../_component/Main";
import { useSession } from "next-auth/react";
export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.replace("/home");
    return null;
  }

  router.replace("/i/flow/login");

  // 이쪽으로 보내고 리턴 아래의 랜더되는 페이지는 children 으로 전달될 배경 페이지임
  return <Main />;
}

// beforeLogin에서 사용자가 i/flow/login 이 아니라 /login 으로 직접 입력해서 들어왔을 경우 /i/flow/login 으로 보내줌
// 로그인이 되어있는 상태에서 이 페이지에 접근을 했다면, 확인해서 /home 으로 redirect 시켜줌
