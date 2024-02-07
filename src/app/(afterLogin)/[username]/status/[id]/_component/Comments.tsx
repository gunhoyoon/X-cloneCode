"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import Post from "@/app/(afterLogin)/_component/Post";

type Props = {
  id: string;
};
export default function Comments({ id }: Props) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);
  // client 컴포넌트에선 useQueryClient() 사용/ 서버 컴포넌트에선 new QueryClient() 사용
  // ["posts", id] 키를 넣어서 데이터를 가져오는 이유는 post 가 없다면, comment도 없기 때문에 상황에 따라 보여주기 위해서.
  const { data, error } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
    enabled: !!post,
  });
  if (post) {
    return (
      <>
        {data?.map((post) => (
          <Post post={post} key={post.postId} />
        ))}
      </>
    );
  }
  return null;
}

//  'posts' , 1 의 데이터
// 'posts' , 1 , comments의 데이터 를 가지게 됨
