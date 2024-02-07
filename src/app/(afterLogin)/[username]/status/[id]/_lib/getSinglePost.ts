// import { Post } from "@/model/Post";
// import { QueryFunction } from "@tanstack/react-query";
// export const getSinglePost: QueryFunction<
//   Post,
//   // 함수가 리턴하는 데이터 타입
//   [_1: "posts", _2: string] // 쿼리 타입 정의
// > = async ({ queryKey }) => {
//   const [_1, id] = queryKey;
//   const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
//     next: {
//       tags: ["posts", id],
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// };

// 여기서 사용하는 제네릭? 사용하기 나름이지만,
// 너가 만든 함수가 리턴하는 데이터 타입과 + 그 쿼리키 타입을 입력한다면,
// QueryFunction 으로 조합해서 타입을 만들어주겠다. 정도

import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

export const getSinglePost: QueryFunction<
  Post,
  [_1: "posts", _2: string]
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
    next: {
      tags: ["posts", id],
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
