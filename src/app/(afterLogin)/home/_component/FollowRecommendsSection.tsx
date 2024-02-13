"use client";
import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FollowRecommend from "../../_component/FollowRecommend";
import { getFollowRecommends } from "../../_lib/getFollowRecommends";

export default function FollowRecommendsSection() {
  const { data, isPending } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  // useQuery를 통해 서버에서 받아온 follow user 정보를 props 으로 전달해줌

  return (
    <>
      {data?.map((user) => (
        <FollowRecommend user={user} key={user.id} />
      ))}
    </>
  );
  //   return data?.map((user) => <FollowRecommend user={user} key={user.id} />);
}
