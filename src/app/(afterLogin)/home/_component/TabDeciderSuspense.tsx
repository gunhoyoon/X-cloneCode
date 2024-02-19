"use client";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import TabDecider from "./TabDecider";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Post as IPost } from "@/model/Post";

export default function TabDeciderSuspense() {
  const { data } = useSuspenseInfiniteQuery<
    IPost[], // 함수가 리턴하는 데이터 타입
    Object,
    InfiniteData<IPost[]>, // 무한 스크롤 데이터 타입 (IPost[] 를 포함하는 infiniteData)
    [_1: "posts", _2: "recommends"], // 쿼리키 타입정의
    number // getPostRecommends의 페이지 매개변수의 타입을 정의함.
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    // cursor가 0 = 1,2,3,4,5  [1,2,3,4,5] 가 lastPage가 됨. 그 중 마지막 postId = 5가 됨
    // 이래서 다음 cursor는 5가 되고, -> [6,7,8,9,10] / 이 전체가 lastPage가 되고 그 중 마지막 postId는 10이 됨. => 다음 커서 10 이런식으로 반복
    // 실제 데이터가 들어오는 형태가 2차원 배열임 [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15]]
    staleTime: 60 * 1000,
    // fresh -> stale Time , 단위가 ms 이기때문에 1분동안은 fresh한 데이터라고 선언해주고 이후에 stale 데이터가 됨, 해당 데이터가 fresh한 데이터인 경우 새로고침을 해도 백엔드에서 데이터를 가져오는게 아닌 캐시된 데이터를 가져오게 된다.
    // 단순하게 말하면 캐시를 얼마나 오래 간직할까에 관한 수치
    gcTime: 300 * 1000,
    // 가비지 컬렉터 타임 기본값 5분
    // initialData: () => [], reset은 데이터의 initialData(초기 데이터)가 있을 수도 있는 상태에서 reset을 하게 되면, 초기 상태로 리셋이 됨, 초기 상태가 없을 경우 데이터를 다시 가져옴
  });
  // console.log("data", data);
  // 인피니티 스크롤링을 하기 위해서 기존에 서버에서 미리 받아왔던 데이터도 prefetchInfiniteQuery 로 수정해줬음
  // 그리고 보여주고 있는 PostRecommends.tsx에서도 useInfiniteQuery 로 변경 / 그에 맞는 속성 추가
  //   const dehydrateState = dehydrate(queryClient);
  // 위 데이터를 불러오고 싶으면
  // queryClient.getQueryData(["posts", "recommend"]); HydrationBoundary안에 있는 컴포넌트들에선 이런식으로 데이터를 불러 사용할 수 있다.
  return <TabDecider />;
}

// 지금 new QueryClient를 사용한 부분이 서버사이드 렌더링을 위해서 서버상에서 먼저 데이터를 요청하는 것
// 서버에서 불러온 데이터를 client의 react query가 물려받는다. 하이드레이트 한다?
// 초기로드 시 react server에서 서버 측 리소스(파일 시스템,데이터베이스) 와 같은 곳에 접근을 해서 처리한 후
// 데이터를 react 트리로 보내게 된다. 이를 통해 리액트 컴포넌트가 html로 렌더링되어 초기 페이지 로드시 사용되며
// 클라이언트 측 코드에도 포함되어 상호작용을 위한 스크립트로 사용된다.
