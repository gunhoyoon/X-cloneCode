type Props = {
  pageParam: number;
};
// PostRecommends 에서 쿼리키로 사용하는 posts,recommends의 타입은 [] 형태로 정의하는게 맞고,
// 추가적으로 pageParam 이 queryKey에 추가됐으니, number만 따로 추가
export async function getPostRecommends({ pageParam }: Props) {
  // pageParams 을 전달하면서 다음 페이지를 불러오는 함수는 만들어둠
  const res = await fetch(
    `http://localhost:9090/api/posts/recommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
      // cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // 응답 유효성 검사
  return res.json();
  // 파싱한 데이터 반환
}
// 서버에서 자동으로 캐싱하게 됨
