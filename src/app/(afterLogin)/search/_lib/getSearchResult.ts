import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getSearchResult: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;
  // getSearchResult 에 들어온 queryKey 받아서 구조분해할당한거, searchParams.q만 따로 사용하려고
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/posts?${urlSearchParams.toString()}`, // searchParams.q의 값은 따로 넘겨주고, 나머지는 searchParams.toString() 으로 같이 넘겨주기
    // 일반객체를 toString() 하는 경우 [object object] 나옴
    // 이 부분에서 해시값을 받아서,
    {
      next: {
        tags: ["posts", "search", searchParams.q],
      }, // next.tags 에서는 searchParams(객체) 전체가 들어갈 수 없어서, searchParams.q 이렇게 사용해줌
      credentials: "include",
      // cache: "no-store",
      // 해당 next : {tags}와 cache 부분은 리액트 쿼리에서 하는게 아니라, nextjs 에서 제공하는 서버쪽 캐싱임. 우선 이 정도만
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // 응답 유효성 검사
  return res.json();
  // 파싱한 데이터 반환
};
