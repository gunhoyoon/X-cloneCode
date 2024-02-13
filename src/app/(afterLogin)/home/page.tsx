import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import styles from "./home.module.css";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabDecider from "./_component/TabDecider";
import TabProvider from "./_component/TabProvider";
import { getPostRecommends } from "./_lib/getPostRecommends";

// 해당 함수는 서버컴포넌트이기 때문에 서버에서 실행이 된다.
// 서버에선 http://localhost:9090/api/postRecommends 주소를 통해 받아온 데이터를 서버에 자동으로 저장(캐싱)을 함
// 캐싱을 하기 떄문에 posts, recommends -> 즉 afterLogin 의 홈페이지는 Pending, loading에서의 스피너나 대체페이지가 의미가 없음
// 해당 페이지의 경우 서버에서 미리 불러와 초기 로드시 클라이언트에게 넘겨주기 때문에 로딩이나 팬딩의 의미 자체가 존재하지 않는거임
// 근데 첫 페이지부터 로딩바를 보여주고 싶으면 prefetchInfiniteQuery 이거 안사용하면 됨
// 이걸 사용안하면 기존에 postRecommend 에 있는 함수가 데이터 요청할거고 로딩바도 보여지게 되겠지,ssr도 안될거임. 근데 기존 x에선 컨텐츠 ssr로 안해둿음
export default async function HomePage() {
  const queryClient = new QueryClient();
  // 지금 new QueryClient를 사용한 부분이 서버사이드 렌더링을 위해서 서버상에서 먼저 데이터를 요청하는 것

  // 서버에서 불러온 데이터를 client의 react query가 물려받는다. 하이드레이트 한다?
  // 초기로드 시 react server에서 서버 측 리소스(파일 시스템,데이터베이스) 와 같은 곳에 접근을 해서 처리한 후
  // 데이터를 react 트리로 보내게 된다. 이를 통해 리액트 컴포넌트가 html로 렌더링되어 초기 페이지 로드시 사용되며
  // 클라이언트 측 코드에도 포함되어 상호작용을 위한 스크립트로 사용된다.
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // cursor값, prefetchInfiniteQuery 사용시 필수 속성
  });
  // 인피니티 스크롤링을 하기 위해서 기존에 서버에서 미리 받아왔던 데이터도 prefetchInfiniteQuery 로 수정해줬음
  // 그리고 보여주고 있는 PostRecommends.tsx에서도 useInfiniteQuery 로 변경 / 그에 맞는 속성 추가
  const dehydrateState = dehydrate(queryClient);
  // 위 데이터를 불러오고 싶으면
  // queryClient.getQueryData(["posts", "recommend"]); HydrationBoundary안에 있는 컴포넌트들에선 이런식으로 데이터를 불러 사용할 수 있다.
  // throw "으악";
  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <PostForm />
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
