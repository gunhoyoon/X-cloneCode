import style from "./profile.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UserPosts from "./_component/UserPosts";
import { getUserPosts } from "./_lib/getUserPosts";

import UserInfo from "../_component/UserInfo";
import { auth } from "@/auth";
import { getUserServer } from "./_lib/getUserServer";
import { User } from "@/model/User";
// 해당 페이지는 서버사이드 렌더링으로 만들건데, 이 기준은 검색 페이지에 노출되면 좋은 페이지를 중점으로 ssr 처리를 해줄거임
// 서버에서 데이터를 만들어서 초기 접근 시 해당 페이지를 빠르게 볼 수 있게 처리함

// userProfile 페이지, 본인의 개인 페이지 혹은 다른 누군가의 프로필 페이지가 될 수 있음
// 그 사람의 정보 + 포스트까지 나와야하기 때문에 userId , PostId 정도는 다이나믹하게 받아올 수 있게 처리할거임
// useQuery 2번의 요청을 통해 해당 페이지의 데이터를 채워넣을거임

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
  };
}

// 동적인 경로 params 받아주기, userId와 같은 인자를 username 으로 사용하게 됨
export default async function Profile({ params }: Props) {
  const session = await auth();

  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });
  // queryKey : ['users' , username] 이 부분에서 username은 동적 데이터임
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydrateState = dehydrate(queryClient);

  // 이 부분에서 추출한 username은 이 페이지에서 보여질 데이터가 유저에 관한 정보 / 그 유저가 작성한 포스트에 대한 정보
  // 그러니까 username을 통해서 동적인 유저의 아이디? 와 같은 구조를 넘기게 되는거임
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}

// 이 부분 생각해야할거.
// 1 . ssr로 동작함. 서버에서 데이터 요청하는 코드. 그리고 각각 컴포넌트에서도 같은 데이터를 받아오는 코드있음
// 2 . 나의 유저 페이지가 아니라 동적으로 유저 전부의 페이지가 됨
// 3 . UserInfo(유저 프로필) , UserPosts(해당 유저의 포스트) 2개의 파트로 나뉘기에 Query를 2번 호출함.
// 4 . 서버에서 데이터를 받아 클라이언트에게 전달하는 과정인 하이디레이션바운더리 통해서 전달하는 과정이 있음
// 5 . 앞으로의 ssr 이 필요한 부분은 다 이런식으로 처리함
// 6 . userId가 유효하지 않은 것을 가지고 해당 페이지 접근할 수 있으니 각각의 컴포넌트에서 없는 경우 처리도 해줌
// 7 . 데이터 요청하는 함수를 사용할 때, 해당 함수가 반환하는 데이터 타입 / 쿼리키에 관한 타입 나눠서 선언하는데, 제네릭 타입 정의하는 부분 너무 복잡함
