"use client";
import { Post as IPost } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSinglePost } from "../_lib/getSinglePost";
import Post from "../../../../_component/Post";
import styles from "../../../../[username]/profile.module.css";
type Props = {
  id: string;
  noImage?: boolean;
};

export default function SinglePost({ id, noImage }: Props) {
  const { data: post, error } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: "posts", _2: string] // queryKey에 관한 타입
  >({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (error) {
    return (
      <div className={styles.notFoundUser}>게시글을 찾을 수 없습니다.</div>
    );
  }
  if (!post) {
    return null;
  }

  return <Post key={post.postId} post={post} noImage={noImage} />;
}
