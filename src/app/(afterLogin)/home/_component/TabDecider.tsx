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
// 이 부분은 주소에 따라 페이지가 달라지는게 아니라 주소는 같고 탭만 달라지는거기때문에 이 부분에선 탭의 상태를 가지고 나눠야함
