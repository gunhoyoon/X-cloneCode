import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
import { MouseEventHandler } from "react";
dayjs.locale("ko");
// 한글 플러그인
dayjs.extend(relativeTime);
// dayjs라이브러리에서 extend 함수는 플러그인을 datjs 인스턴스에 추가함
// relativeTime 은 플러그인 중 하나로 상대적 시간을 표현하는 기능임, 글이 작성되는 어느 곳이라면 다 필요할듯
// 클래스가 일종의 설계도나 틀 이라면, 인스턴스는 그 설계도를 바탕으로 만들어낸 실제 '물건', 붕어빵과 같은 느낌임

type Props = {
  noImage?: boolean;
  post: Post;
};
const stopPropagetion: MouseEventHandler<HTMLAnchorElement> = (e) => {
  e.stopPropagation();
  // 이벤트 버블링, 이벤트캡쳐링이 해당 돔트리에서 더 이상 전파되지않게 막아줌
};

export default function Post({ noImage, post }: Props) {
  let target = post;
  // console.log("target", target);
  if (post.Original) {
    target = post.Original;
    // 아 만약 재게시글이라면, post에 Original이 들어있을거니까,
    // 그 원본과 재게시라는 텍스트를 보여주기 위함.
    // 그냥 재게시면 : 재게시글입니다 + 원본,
    // 아니면 원본.
    // 기존 원본 + 글 까지니까, 포스트에 텍스트 추가하는게 아니라 하날 더 그려야하는거니까 그 오리지날을 target에 담는거임
  }
  return (
    <PostArticle post={target}>
      {post.Original && (
        <div className={style.postReposted}>
          <svg
            viewBox="0 0 24 24"
            width={16}
            aria-hidden="true"
            className="r-14j79pv r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
          >
            <g>
              <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
            </g>
          </svg>
          재게시했습니다
        </div>
      )}
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link
            href={`/${target.User.id}`}
            className={style.postUserImage}
            onClick={stopPropagetion}
          >
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`} onClick={stopPropagetion}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          {target.Parent && (
            <Link
              href={`/${target.Parent.User.id}`}
              style={{ color: "rgb(29,155,240)" }}
              onClick={stopPropagetion}
            >
              {target?.Parent?.User.id}에게 보내는 답글
            </Link>
          )}
          {/* 답글도 결국 포스트임, 포스트와 동시에 parent가 있다면, 그에 관한 표시만해주면 됨 */}
          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          <ActionButtons post={post} />
        </div>
      </div>
    </PostArticle>
  );
}
