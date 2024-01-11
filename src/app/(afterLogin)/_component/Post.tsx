import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import faker from "@faker-js/faker";
dayjs.locale("ko");
// 한글 플러그인
dayjs.extend(relativeTime);
// dayjs라이브러리에서 extend 함수는 플러그인을 datjs 인스턴스에 추가함
// relativeTime 은 플러그인 중 하나로 상대적 시간을 표현하는 기능임, 글이 작성되는 어느 곳이라면 다 필요할듯
// 클래스가 일종의 설계도나 틀 이라면, 인스턴스는 그 설계도를 바탕으로 만들어낸 실제 '물건', 붕어빵과 같은 느낌임

export default function Post() {
  const target = {
    postId: 1,
    User: {
      id: "elonmusk",
      nickname: "Elon Musk",
      image: "/yRsRRjGO.jpg",
    },
    content: "클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ",
    createdAt: new Date(),
    Images: [
      {
        imageId: 1,
        link: faker,
      },
    ],
  };
  return (
    <PostArticle post={target}>
      {/* 기존의 article 을 클릭했을 때 상세 페이지로 이동해야하는데,
      이걸 a 태그로 처리하지않고 클릭했을 때 이동하게끔 클라이언트로 처리해주고 있는데, 이거 하나때문에 post 전체를 client 컴포넌트로
      바꾸는건 좀 그러니까 article만 클라이언트 컴포넌트로 바꿔줌 */}
      {/* 클라이언트 컴포넌트가 부모고
        서버 컴퍼넌트가 자식임
        만약 클라이언트 컴포넌트 안에서 서버 컴포넌트를 import 해서 사용한다면, 서버 컴포넌트의 성격이 클라이언트 컴포넌트로 바뀌어버림 */}
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
              {/* 공백 정규 표현식 */}
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}></div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
