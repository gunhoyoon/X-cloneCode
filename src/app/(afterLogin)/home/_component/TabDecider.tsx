"use client";
import React, { useContext } from "react";
import FollowingPosts from "./FollowingPosts";
import PostRecommends from "./PostRecommends";
import { TabContext } from "./TabProvider";

export default function TabDecider() {
  const { tab } = useContext(TabContext);
  if (tab === "rec") {
    return <PostRecommends />;
  }
  return <FollowingPosts />;
}

// useContext 에서 설장한 TabContext를 통해서 tab의 현재 상태를 가져와서 컴포넌트 다르게 렌더링
