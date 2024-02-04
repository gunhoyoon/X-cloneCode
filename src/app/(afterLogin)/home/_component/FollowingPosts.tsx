"use client";
import { Post as IPost } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Post from "../../_component/Post";
import { getFollowignPosts } from "../_lib/getFollowingPosts";

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowignPosts,
    staleTime: 60 * 1000, // fresh -> stale Time , 단위가 ms 이기때문에 1분동안은 fresh한 데이터라고 선언해주고 이후에 stale 데이터가 됨, 해당 데이터가 fresh한 데이터인 경우 새로고침을 해도 백엔드에서 데이터를 가져오는게 아닌 캐시된 데이터를 가져오게 된다.
    // 단순하게 말하면 캐시를 얼마나 오래 간직할까에 관한 수치
    gcTime: 300 * 1000,
    // 가비지 컬렉터 타임 기본값 5분
    // initialData: () => [], reset은 데이터의 initialData(초기 데이터)가 있을 수도 있는 상태에서 reset을 하게 되면, 초기 상태로 리셋이 됨, 초기 상태가 없을 경우 데이터를 다시 가져옴
  });
  console.log(data, "data");
  return (
    <>
      {data?.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
}
