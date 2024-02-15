"use client";
import { Post as IPost } from "@/model/Post";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import Post from "../../_component/Post";
import { getFollowignPosts } from "../_lib/getFollowingPosts";
export default function FollowingPosts() {
  const { data } = useSuspenseQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowignPosts,
    // queryFn 함수가 돌아가는 동안 , 데이터를 받아오는 동안 isPending -> true, 가져오고 나면 isLoading -> true
    staleTime: 60 * 1000, // fresh -> stale Time , 단위가 ms 이기때문에 1분동안은 fresh한 데이터라고 선언해주고 이후에 stale 데이터가 됨, 해당 데이터가 fresh한 데이터인 경우 새로고침을 해도 백엔드에서 데이터를 가져오는게 아닌 캐시된 데이터를 가져오게 된다.
    // 단순하게 말하면 캐시를 얼마나 오래 간직할까에 관한 수치
    gcTime: 300 * 1000,
    // 가비지 컬렉터 타임 기본값 5분
    // initialData: () => [], reset은 데이터의 initialData(초기 데이터)가 있을 수도 있는 상태에서 reset을 하게 되면, 초기 상태로 리셋이 됨, 초기 상태가 없을 경우 데이터를 다시 가져옴
  });
  // console.log(data, "data");
  // if (isPending) {
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center" }}>
  //       <svg
  //         className={styles.loader}
  //         height="100%"
  //         viewBox="0 0 32 32"
  //         width={40}
  //       >
  //         <circle
  //           cx="16"
  //           cy="16"
  //           fill="none"
  //           r="14"
  //           strokeWidth="4"
  //           style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
  //         ></circle>
  //         <circle
  //           cx="16"
  //           cy="16"
  //           fill="none"
  //           r="14"
  //           strokeWidth="4"
  //           style={{
  //             stroke: "rgb(29, 155, 240)",
  //             strokeDasharray: 80,
  //             strokeDashoffset: 60,
  //           }}
  //         ></circle>
  //       </svg>
  //     </div>
  //   );
  // }
  // 이 로딩에 관련된 부분이 중복되는데 client지만 suspense의 fallback을 사용하는 방법이 있는데, useSuspenseQuery 를 사용하면 됨
  // 그럼 FollowingPosts를 감싸고 있는 suspense 를 useSuspenseQuery 애가 인지를 해서 loading 상태에 걸리게 되면, suspense에 걸려있는 fallback에 로딩을 넘겨줌
  // 추가적으로 에러가 발생했을 때도 서스팬스(페이지단)에 있는 error.tsx 가 보여지게됨
  // 참고로 로딩을 임포트해서 사용해도 됨 그럼 중복을 줄일 수 있게 되니까

  return (
    <>
      {data?.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
}
