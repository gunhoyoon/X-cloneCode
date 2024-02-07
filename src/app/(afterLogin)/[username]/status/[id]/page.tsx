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

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
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
