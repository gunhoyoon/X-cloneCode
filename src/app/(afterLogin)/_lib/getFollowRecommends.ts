export async function getFollowRecommends() {
  const res = await fetch(`http://localhost:9090/api/users/followRecommends`, {
    next: {
      tags: ["users", "followRecommends"],
      // 해당 태그의 대한 기준을 삼는게 중요함.
    },
    // cache: "no-store",
    // 해당 next : {tags}와 cache 부분은 리액트 쿼리에서 하는게 아니라, nextjs 에서 제공하는 서버쪽 캐싱임. 우선 이 정도만
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // 응답 유효성 검사
  return res.json();
  // 파싱한 데이터 반환
}
