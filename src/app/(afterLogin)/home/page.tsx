import React, { Suspense } from "react";
import styles from "./home.module.css";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import Loading from "./loading";
import TabDecider from "./_component/TabDecider";
import { auth } from "@/auth";

// 해당 함수는 서버컴포넌트이기 때문에 서버에서 실행이 된다.
// 서버에선 http://localhost:9090/api/postRecommends 주소를 통해 받아온 데이터를 서버에 자동으로 저장(캐싱)을 함
// 캐싱을 하기 떄문에 posts, recommends -> 즉 afterLogin 의 홈페이지는 Pending, loading에서의 스피너나 대체페이지가 의미가 없음
// 해당 페이지의 경우 서버에서 미리 불러와 초기 로드시 클라이언트에게 넘겨주기 때문에 로딩이나 팬딩의 의미 자체가 존재하지 않는거임
// 근데 첫 페이지부터 로딩바를 보여주고 싶으면 prefetchInfiniteQuery 이거 안사용하면 됨
// 이걸 사용안하면 기존에 postRecommend 에 있는 함수가 데이터 요청할거고 로딩바도 보여지게 되겠지,ssr도 안될거임. 근데 기존 x에선 컨텐츠 ssr로 안해둿음
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
