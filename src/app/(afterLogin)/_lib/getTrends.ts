export const getTrends = async () => {
  const res = await fetch(`http://localhost:9090/api/hashtags/trends`, {
    next: {
      tags: ["trends"],
    },
    credentials: "include", // 여기서의 권한이 없다 (403) 의 경우 로그인이 필요한데 로그인을 했는지? 했으면 쿠키주삼, 해서 요청 때 추가해주는거임
    // 내가 로그인했다는걸 알아야하는 상황에선 위 옵션을 추가해서 쿠키 넣어줘야된다. 그래야 서버에서 얘 권한있는 애구나 하고 데이터 줌
    // credentials: "include" 이 옵션을, 초반엔
    cache: "no-store",
  });
  //  hashtag 입력하고 포스트하면, 해시태그에 관한 데이터를 /api/hashtags/trends 를 통해 받아올 수 있음
  // 정렬도 해서 옴
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
