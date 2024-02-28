import React, { Suspense } from "react";
import styles from "./home.module.css";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import Loading from "./loading";
import TabDecider from "./_component/TabDecider";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈 / Z",
  description: "홈",
};

export default async function HomePage() {
  const session = await auth();
  // 서버에서 세션 불러오는 법 / 클라이언트는 useSession
  // throw "으악";

  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          {/* suspense 를 사용하는 쪽은 서버 컴포넌트여야함. */}
          {/* Suspense가 TabDeciderSuspense 내부가 아닌 page단에 있는건, 이렇게 해야  <TabDeciderSuspense /> 컴포넌트가 로드가 됐는지 어떤 상태인지 감지가 되니까, 
          다른건 먼저 로드하고 이건 잠깐 중단이 가능하니까 */}
          <TabDecider />
          {/* <TabDeciderSuspense /> */}
        </Suspense>
      </TabProvider>
    </main>
  );
}
// 탭프로바이더를 통해 현재 탭의 상태를 공유하고 있으니, 탭에 상태에 따라 다른 컴포넌트를 보여주는, 컴포넌트를 만들면 된다.(tabDecider)
// 현재 탭의 상태에 따라 포스트들이 바뀐다.
// 그 말은 탭의 상태를 포스트 관련 컴포넌트들은 알고 있어야한다는 것이다.
// 현재 데이터 상태를 공유하기 위해서 바운더리로 감싸줌, 중요한건 서버와 클라이언트의 동기화가 된다는거임
