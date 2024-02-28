import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import CommentForm from "./_component/CommentForm";
import SinglePost from "./_component/SinglePost";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSinglePost } from "./_lib/getSinglePost";
import Comments from "./_component/Comments";
import { User } from "next-auth";
import { getUserServer } from "../../_lib/getUserServer";
import { Post } from "@/model/Post";
import { getSinglePostServer } from "./_lib/getSingleServerPost";
import { getComments } from "./_lib/getComments";

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  const post: Post = await getSinglePostServer({
    queryKey: ["posts", params.id],
  });
  console.log("user", user);
  return {
    title: `Z에서 ${user?.id} 님 : ${post.content}`,
    description: post.content,
  };
}
// 메타 데이터 동적으로, 결국 user정보, 해당 유저 post관련 데이터 명시해주는거

type Props = {
  params: {
    id: string;
    username: string;
  };
};

// 여기서 사용하고 있는 getUserServer, getSingleServer, getComments 셋 다 fetch(nextJs) 를 사용하고 있음
// getSingleServer를 보면 같은 요청을 두번하는게 아닌가 할 수 있는데 여기서 Request memoization 이라고 해서 중복된 요청을 알아서 재사용함
// 그래서 중복 요청이라고 해도 캐시해두고 있기 때문에, 서버쪽에 크게 부담이 가지 않음
// 페이지를 처음에 렌더링할 때의 중복된 요청이 있으면 그걸 없애주는거임, 한 페이지를 렌더할 때의 중복 요청을 없애주는거기 때문에
// 다음 페이지 요청을 할 땐 캐시가 초기화돼서 다시 새로가져옴. 그러니까 한 페이지를 렌더할 때 요청을 제거해주는거 명심하자
export default async function Page({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePostServer,
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  // 서버에서 데이터 먼저 불러오기
  // 포스트 전체를 클릭했을 때, 그 포스트의 상세 페이지로 들어가게 되는데, 그에 관한 데이터를 미리 받아오게 되는거임
  // 위 데이터 자체를 불러오는건 @modal 사용하는 photo/[photoId] 사용하는 쪽이랑 같은데,
  // 우선 폴더 라우터를 통해서 경로가 잡힌거랑, 서버에 요청하는 경로랑 헷갈리면 안될거 같고,
  // 같은 키를 넣어서 데이터를 요청한 바가 있으면, 해당 데이터를 캐싱해두는 동안은 네트워크 요청을 통하는게 아니라 캐시된 데이터를 사용하기때문에 효율적이다.
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
