export async function getFollowRecommends() {
  const res = await fetch(`http://localhost:9090/api/users/followRecommends`, {
    next: {
      tags: ["users", "followRecommends"],
      // 해당 태그의 대한 기준을 삼는게 중요함.
    },
    // cache: "no-store",
    credentials: "include",
    // 서버에서 내가 누군지 알아야되니까 옵션 추가 해줌, 내 자신은 팔로우 추천에서 빼줘야하니까
  });
  // 여기 데이터도 팔로우수가 많은 순으로 정렬해서 넘어옴, 그리고 내 계정은 뜨지않도록 해놈..
  // 일단 내 정보가 안나오도록 또는 로그인 시만 사용가능한 데이터 이런 구조라면 서버에 요청할 때 꼭 쿠키를 담아서 요청해야됨
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // 응답 유효성 검사
  return res.json();
  // 파싱한 데이터 반환
}
