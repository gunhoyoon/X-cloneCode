// 여기서 사용하는 제네릭? 사용하기 나름이지만,
// 너가 만든 함수가 리턴하는 데이터 타입과 + 그 쿼리키 타입을 입력한다면,
// QueryFunction 으로 조합해서 타입을 만들어주겠다. 정도

export const getSinglePost = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`, {
    next: {
      tags: ["posts", id],
    },
    credentials: "include",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
