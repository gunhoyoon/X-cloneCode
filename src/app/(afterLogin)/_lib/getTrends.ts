export const getTrends = async () => {
  const res = await fetch(`http://localhost:9090/api/hashtags/trends`, {
    next: {
      tags: ["trends"],
    },
    credentials: "include", // 여기서의 권한이 없다 (403) 의 경우 로그인이 필요한데 로그인을 했는지? 했으면 쿠키주삼, 해서 요청 때 추가해주는거임
    // credentials: "include" 이 옵션을, 초반엔
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
