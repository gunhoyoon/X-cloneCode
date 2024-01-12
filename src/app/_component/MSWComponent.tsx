"use client";
import { useEffect } from "react";

export default function MSWComponent() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      require("@/mocks/browser");
      // .env파일에서 NEXT_PUBLIC_API_MOCKING값이 enabled 라면 msw 실행중 , 아니라면 msw가 꺼지게 되는거임
      // 근데 실제 배포할 땐 .env 사용할거고 해당 파일을 비워놓을거니까 msw 사용 x , 개발 시엔 env.local 사용할거고 현재 true 니까 msw 사용활거임
    }
  }, []);
  return null;
}
