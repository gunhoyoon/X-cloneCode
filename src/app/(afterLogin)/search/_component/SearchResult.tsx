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
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
    // 타입을 맞춰주기 위해서 사용, searchParmas 의 정의가 searchParams: { q: string; f?: string; pf?: string }; 이기 떄문에,
    // _1 , _2 가 'posts', 'search' 타입을 맞춰준거임
  >({
    queryKey: ["posts", "search", searchParams], // queryKey searchParams는 객체 형태가 들어갈 수 있음. next에서의 queryKey는 객체형태가 안됨.
    queryFn: getSearchResult, //   queryKey: ["posts", "search", searchParams] 해당 값이 getSearchResult queryKey로 넘어감, queryKey로 받을 수 있음
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  return data?.map((post) => <Post key={post.postId} post={post} />);
}
