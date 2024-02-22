"use client";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import { Post as IPost } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import style from "../photoModal.module.css";
type Props = {
  id: string;
};

export default function ImageZone({ id }: Props) {
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

  if (!post?.Images[0]) {
    return null;
  }
  return (
    <div className={style.imageZone}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post?.Images[0].link} alt={post?.content} />
      <div
        className={style.image}
        style={{ backgroundImage: `url(${post?.Images[0].link})` }}
      />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white post={post} />
        </div>
      </div>
    </div>
  );
}
