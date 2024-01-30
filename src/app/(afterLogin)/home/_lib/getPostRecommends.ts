export async function getPostRecommends() {
  const res = await fetch(`http://localhost:9090/api/postRecommends`, {
    next: {
      tags: ["posts", "recommends"],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // 응답 유효성 검사
  return res.json();
  // 파싱한 데이터 반환
}
