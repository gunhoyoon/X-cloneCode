import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import style from "./photoModal.module.css";
import PhotoModalCloseButton from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import React from "react";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import ImageZone from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/ImageZone";

type Props = {
  params: { id: string };
};
export default async function Default({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);
  // 서버 컴포넌트로써 "posts", id 를 쿼리키로 받고,
  // 해당 포스트 목록의 클릭된 포스트 하나 (상세로 들어갈 포스트 하나)
  // 그 포스트 1개의 고유 id를 가지는 게시물의 comments 데이터까지 요청
  // 서버에서 먼저 데이터를 받아와서, 클라이언트가 초기 렌더 시 보다 빠르게 보여지게 할 수 있음
  // dehydratedState 를 사용해서.
  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
// 포스트에 이미지가 있고 그 이미지를 클릭한다면 보여질 모달, 페레럴 라우트임.
// afterLogin/layout {modal} 을 통해 보여지게 될거임
