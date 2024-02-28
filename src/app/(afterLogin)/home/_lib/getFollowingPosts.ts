type Props = {
  pageParam: number;
};
export async function getFollowignPosts({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/followings?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "followings"],
      },
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
}
