import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";
export const getSinglePost: QueryFunction<
  Post,
  // 함수가 리턴하는 데이터 타입
  [_1: string, _2: string] // 쿼리 타입 정의
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
    next: {
      tags: ["posts", id],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
