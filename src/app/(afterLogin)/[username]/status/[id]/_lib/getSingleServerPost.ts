import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getSinglePostServer = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    {
      next: {
        tags: ["posts", id],
        // revalidate: 3600, 이런식으로 시간을 정해놓고 지나면 자동으로 갱신하거나
        // tags: 에 들어간 'posts' , id 이런게 ondemend 에 사용되는건데, 태그로 직접 갱신하는 법
      },
      credentials: "include",
      headers: { Cookie: cookies().toString() },
      // 여기 옵션에 들어가는 cache: "no-store" 의 경우가 Data Cache 으로 치면, 이 요청(프론트 -> 백)을 얼마나 기억하고 있을거냐
      // 기본값은 캐시를 안하거나, 새로고침하지 않는 이상 계속 유지된다. (Duration)
      // Revalidating : 내가 설정한 시간만큼 캐시하고 자동으로 갱신하는 법 또는 직접 코드를 입력해 갱신하겠다 하는게 있음(next{내부 옵션임})
      //
      cache: "no-store",
      // 이런걸 잘 사용해야하는게, 뭐 인스타나 x 볼 때 새로운 글을 보려고 새로고침을 하게 되는데, 그럴 땐 캐시를 안하는게 좋음
      // 때에 따라 잘 사용해야겠지 ....
    }
  );
  // revalidateTag('posts') // posts 태그 들어간 캐시 다 갱신
  // revalidatePath('/home') // home페이지에 있는 요청 다 갱신,  이런식으로 수동적으로 갱신하는 방법이 있음
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

// 프론트 서버에서 백엔드서버에 요청을 보내는거, 아 이렇게 구분하면 되겠네. 이것도 어차피 그려지게 되면 서버 컴포넌트니까 프론트 서버에서 그려질거고
// 그려지는 중에 요청이 있으니까 요청을 보내겠지. 그럼 자연스럽게 프론트서버에서 백엔드로 요청하는게 되겠지
