import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
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

export default function Post({ noImage, post }: Props) {
  const target = post;

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
