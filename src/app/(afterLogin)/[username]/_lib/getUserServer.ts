import { cookies } from "next/headers";

export const getUserServer = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, username] = queryKey;

  //  _1, _2 : string,  queryKey에 관한 타입 정의
  // getUser에 queryKey로 어떤 값이 어떻게 들어오는거야?

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${username}`,
    {
      next: {
        tags: ["users", username],
      },

      headers: { Cookie: cookies().toString() },
      cache: "no-store",
      // 해당 데이터가 서버에서 profilePage 프리패치할 때 사용되는데, 근데 서버에선 credentials: "include", 이게 사용이 안되기 때문에,(클라이언트꺼니까)
      //  서버쪽에서 사용하면 쿠키가 전달이 안되는 현상이 발생함. 그래서 서버쪽에서 브라우저에 쿠키 전달이 안됨
      // headers: { Cookie: cookies.toString() }, 를 사용해서 전달해야 서버에서 브라우저한테 쿠키전달이 되는데,
      // getUser 자체가 서버 컴포넌트 , 클라이언트 컴포넌트 양쪽에서 사용이 되기때문에, 이래도 에러가 발생함.
      // 그래서 함수를 분리해줄거임, 옵션만 다르게 해서 같은 코드를 사용하면 되니까, getUserServer 이런식으로 만들어서, 한쪽에선 client에 적합하게, 한쪽에선 server에 적합하게
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
