"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Post as IPost } from "@/model/Post";
import { getSearchResult } from "../_lib/getSearchResult";
import Post from "../../_component/Post";
type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function SearchResult({ searchParams }: Props) {
  // searchParmas를 통해 검색어가 들어오기 때문에, 해당 값을 쿼리키로 사용해서, 요청하는 함수에 searchParams에 관한 데이터를 계속 넘겨줌
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]] // queryKey에 관한 타입
    // 타입을 맞춰주기 위해서 사용, searchParmas 의 정의가 searchParams: { q: string; f?: string; pf?: string }; 이기 떄문에,
    // _1 , _2 가 'posts', 'search' 타입을 맞춰준거임
  >({
    queryKey: ["posts", "search", searchParams], // queryKey searchParams는 객체 형태가 들어갈 수 있음. next 제공하는 tags 는 객체 형태로 들어올 수 없음
    queryFn: getSearchResult, //   queryKey: ["posts", "search", searchParams] 해당 값이 getSearchResult queryKey로 넘어감, queryKey로 받을 수 있음
    staleTime: 60 * 1000,
    gcTime: 150 * 1000,
  });
  return data?.map((post) => <Post key={post.postId} post={post} />);
}
