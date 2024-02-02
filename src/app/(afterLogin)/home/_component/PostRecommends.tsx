"use client";
import { Post as IPost } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Post from "../../_component/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default function PostRecommends() {
  const { data, isLoading } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale Time , 단위가 ms 이기때문에 1분동안은 fresh한 데이터라고 선언해주고 이후에 stale 데이터가 됨, 해당 데이터가 fresh한 데이터인 경우 새로고침을 해도 백엔드에서 데이터를 가져오는게 아닌 캐시된 데이터를 가져오게 된다.
    // 단순하게 말하면 캐시를 얼마나 오래 간직할까에 관한 수치
    gcTime: 300 * 1000,
    // 가비지 컬렉터 타임 기본값 5분
    // initialData: () => [], reset은 데이터의 initialData(초기 데이터)가 있을 수도 있는 상태에서 reset을 하게 되면, 초기 상태로 리셋이 됨, 초기 상태가 없을 경우 데이터를 다시 가져옴
  });
  // 서버 컴포넌트에서 요청한 데이터를 클라이언트에서 똑같이 요청하는 이유는 사용자와의 상호작용에서 필요한 데이터를 보여주기 위함임(쉽게 말하면 탭이 클릭됐을 때 데이터를 요청해서 보여줘야하니까.)
  if (isLoading) {
    return <div>loading ...</div>;
  }
  console.log(data, "data");
  return data
    ? data?.map((post) => <Post key={post.postId} post={post} />)
    : null;
}

// type Post 를 가져왔지만, component Post랑 겹치기 때문에 에러가 발생함, 그래서 이름 바꿔줌 IPost에서 I는 interface 라는 뜻
// handler api/postRecommends 라는 경로로 데이터를 가져오게 됨, 설정해둔 가상의 데이터를 불러오게 된다.
// staleTime 으로 설정해둔 기간안에는 새로 불러오지 않고 같은 캐시 데이터를 사용하게 됨. 실제 데이터 상태도 fresh 라고 표기됨
// 이후 시간이 지나서 stale 로 상태가 바뀌게 되고, 그 데이터를 불러올 시 새로운 데이터를 가져오게 되는거임

// gcTime에 대한 설명은 inactive 상태를 알아야하는데, 단순하게 설명하면 데이터를 불러왔지만 어디서도 쓰고 있지 않을 때 해당 상태가 된다.
// inactive 상태가 되면 gcTime이 돌아가게 되는데, 사용하지 않고 메모리만 차지하고 있는 데이터를 gcTime 이후가 되면 캐시가 날라가게 된다.

// 그래서 기본적으로 staleTime 보다 gcTime이 더 길게 설정을 해놔야한다.
// staleTime 동안에는 캐시에서 데이터를 꺼내서 사용하려고 하는것이지만, 그보다 gcTime이 짧게 되면 캐시된 데이터가 사라지기 때문에 staleTime 시간의 의미 자체가 사라짐
