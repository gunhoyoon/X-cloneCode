import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import styles from "./home.module.css";
import PostForm from "./_component/PostForm";
import PostRecommends from "./_component/PostRecommends";
import Tab from "./_component/Tab";
import TabDecider from "./_component/TabDecider";
import TabProvider from "./_component/TabProvider";
import { getPostRecommends } from "./_lib/getPostRecommends";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });

  const dehydrateState = dehydrate(queryClient);
  // queryClient.getQueryData(["posts", "recommend"]); HydrationBoundary안에 있는 컴포넌트들에선 이런식으로 데이터를 불러 사용할 수 있다.

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <PostForm />
          {/* <PostRecommends /> */}
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
// 탭프로바이더를 통해 현재 탭의 상태를 공유하고 있으니, 탭에 상태에 따라 다른 컴포넌트를 보여주는, 컴포넌트를 만들면 된다.(tabDecider)

// 현재 탭의 상태에 따라 포스트들이 바뀐다.
// 그 말은 탭의 상태를 포스트 관련 컴포넌트들은 알고 있어야한다는 것이다.
// 현재 데이터 상태를 공유하기 위해서 바운더리로 감싸줌, 중요한건 서버와 클라이언트의 동기화가 된다는거임
