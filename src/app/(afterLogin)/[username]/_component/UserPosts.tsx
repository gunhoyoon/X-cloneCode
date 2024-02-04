"use client";
import { Post as IPost } from "@/model/Post";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getUserPosts } from "../_lib/getUserPosts";
import Post from "../../_component/Post";
type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  // 동적인 경로가 들어올거고 아마 userId와 같은 개념으로 들어오게 될 것임
  // username을 통해 각각의 userid를 가진 사용자의 페이지를 동적으로 보여지게 됨

  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string] // queryKey에 관한 타입
  >({
    queryKey: ["posts", "user", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  // 해당 컴포넌트에서 유저 정보가 없을 때, 포스트가 안나와야됨 그러기 위해서 user 정보를 가져와야하는데, 있는지 없는지?
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);
  // useQuery 다 연결되어있으니까, 이런식으로 키값을 넣어서 user에 관한 정보를 가져올 수 있음
  // 데이터가 없을 때, handlers에서 404 + error message 내줌
  //   console.log("user", user);
  if (user) {
    return (
      <>
        {data?.map((post) => (
          <Post post={post} key={post.postId} />
        ))}
      </>
    );
  }
}
