"use client";
import { useRouter } from "next/navigation";
import Main from "../_component/Main";

export default function LoginPage() {
  const route = useRouter();
  route.replace("/i/flow/login");
  // 이쪽으로 보내고 리턴 아래의 랜더되는 페이지는 children 으로 전달될 배경 페이지임
  return <Main />;
}
