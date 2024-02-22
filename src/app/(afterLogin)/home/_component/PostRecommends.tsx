"use client";
import { Post as IPost } from "@/model/Post";
import {
  InfiniteData,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import React, { Fragment, useEffect } from "react";
import Post from "../../_component/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending } =
    useSuspenseInfiniteQuery<
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
  // 서버 컴포넌트에서 요청한 데이터를 클라이언트에서 똑같이 요청하는 이유는 사용자와의 상호작용에서 필요한 데이터를 보여주기 위함임(쉽게 말하면 탭이 클릭됐을 때 데이터를 요청해서 보여줘야하니까.)

  // console.log(data, "data");
  // 데이터 타입이 2차원 배열인것 + initialPageParam(cursor), getNextPageParam(next cursor) 데이터가 어떤식으로 사용되는지만 알면 될듯
  // fetchNextPage , hasNextPage 를 추가적으로 사용해줘야하는데.
  // hasNextPage 의 경우는 데이터를 다 불러와서 현재 페이지가 마지막 페이지일경우 false 로 바뀌게 된다.
  // 근데 이게 마지막인지 어떻게 알아? [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]] 지금 데이터를 요청할 때 5개씩 주니까 5의 배수로 한 페이지가 구성되는데,
  // 5개보다 적을 때 즉 5의 배수가 안될 때, 그 페이지가 마지막 페이지가 되는거임. 만약 5의 배수로 딱 떨어진다면, 어쩔 수 없이 포스트 0개짜리 다음 페이지를 불러와야됨
  const { ref, inView } = useInView({
    // 해당 ref 를 div랑 연결해줌
    threshold: 0, // 대상 요소의 몇퍼센트가 보인 후 호출할건지,
    delay: 0, // 보이고 몇 초 후에 이벤트 실행할거임?
  });
  // inView = ref 로 연결한 div가 화면에 안보이면 false , 보이면 true
  // 그럼 의존성 배열로 넣었으니 보였다 안보여도 useEffect가 실행될테니까, inView가 true일때를 잡아서 다음 페이지를 불러오는 함수(fetchNextPage) 를 실행시키는거임
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage]);
  // if (isPending) {
  //   <div style={{ display: "flex", justifyContent: "center" }}>
  //     <svg
  //       className={styles.loader}
  //       height="100%"
  //       viewBox="0 0 32 32"
  //       width={40}
  //     >
  //       <circle
  //         cx="16"
  //         cy="16"
  //         fill="none"
  //         r="14"
  //         strokeWidth="4"
  //         style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
  //       ></circle>
  //       <circle
  //         cx="16"
  //         cy="16"
  //         fill="none"
  //         r="14"
  //         strokeWidth="4"
  //         style={{
  //           stroke: "rgb(29, 155, 240)",
  //           strokeDasharray: 80,
  //           strokeDashoffset: 60,
  //         }}
  //       ></circle>
  //     </svg>
  //   </div>;
  // }
  // useQuery의 로딩, 에러가 중복적으로 작성되기 때문에, useSuspenseInfiniteQuery를 사용해서 날 감싸고 있는 서스팬스의 fallback을 사용하게 된다.

  return (
    <>
      {data?.pages?.map((page, index) => (
        <Fragment key={index}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}

      <div ref={ref} style={{ backgroundColor: "pink", height: 50 }} />
      {/* 얘가 보이기 시작하면 fetchNextPage 를 호출할거임 */}
      {/* 내부에서 사용한 맵의 키 , 외부에서 사용한 맵의 키를 넣어주기 위해 Fragment 를 사용함. 원래는 빈채로 사용하지만 프롭이 있을 땐 사용해줘야함  */}
      {/* 이차원 배열의 형태 */}
    </>
  );
}

// type Post 를 가져왔지만, component Post랑 겹치기 때문에 에러가 발생함, 그래서 이름 바꿔줌 IPost에서 I는 interface 라는 뜻
// handler api/postRecommends 라는 경로로 데이터를 가져오게 됨, 설정해둔 가상의 데이터를 불러오게 된다.
// staleTime 으로 설정해둔 기간안에는 새로 불러오지 않고 같은 캐시 데이터를 사용하게 됨. 실제 데이터 상태도 fresh 라고 표기됨
// 이후 시간이 지나서 stale 로 상태가 바뀌게 되고, 그 데이터를 불러올 시 새로운 데이터를 가져오게 되는거임

// gcTime에 대한 설명은 inactive 상태를 알아야하는데, 단순하게 설명하면 데이터를 불러왔지만 어디서도 쓰고 있지 않을 때 해당 상태가 된다.
// inactive 상태가 되면 gcTime이 돌아가게 되는데, 사용하지 않고 메모리만 차지하고 있는 데이터를 gcTime 이후가 되면 캐시가 날라가게 된다.

// 그래서 기본적으로 staleTime 보다 gcTime이 더 길게 설정을 해놔야한다.
// staleTime 동안에는 캐시에서 데이터를 꺼내서 사용하려고 하는것이지만, 그보다 gcTime이 짧게 되면 캐시된 데이터가 사라지기 때문에 staleTime 시간의 의미 자체가 사라짐
