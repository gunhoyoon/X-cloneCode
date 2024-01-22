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
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
        },
      },
    })
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
