"use client";

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

// 세션프로바이더는 세션 프로바이더를 감싼 컴포넌트들은 다 공유가 되고, context도 프로바이더로 감싸서 공유하듯이,
// 리액트 쿼리도 프로바이더로 감싸주면 패칭한 데이터를 해당 컴포넌트들 안에서 다 공유할 수 있다.

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, // 탭 전환했다가 페이지 접근 시 데이터를 새로 가져오겠다. false
          retryOnMount: true, // 컴포넌트가 언 마운트 됐다가 다시 마운트됐을 때, 컴포넌트 페이지 이동 / 스테이트때문에 언마운트 됐다가 다시 마운트 됐다면, 페이지 이동하면서
          // 홈 컴포넌트가 다시 마운트 됐을 때, 데이터를 다시 가져오게 됨
          refetchOnReconnect: false, // 인터넷 연결이 끊어졌다 다시 연결됐을 때, 데이터를 새로 받아올지 말지
          retry: false, // 데이터를 가져오다 실패했다면, 몇 번 정도 다시 가져올 수 있는 옵션, 실패시 에러페이지 처리해줄거임
        },
      },
    }) // 리액트 쿼리의 경우 데이터를 기본적으로 fresh 라고 처리하지 않음. 이건 코드상에서 개발자가 개인적으로 처리해줘야함
  );
  // 위에서 만든 client를 넣어서 공유할 수 있게 됨
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
      />
      {/* devtools를 개발모드일때만 사용하게끔,  */}
    </QueryClientProvider>
  );
}

export default RQProvider;
