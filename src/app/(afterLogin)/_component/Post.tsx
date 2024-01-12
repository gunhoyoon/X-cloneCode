import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";
import PostImages from "./PostImages";
dayjs.locale("ko");
// 한글 플러그인
dayjs.extend(relativeTime);
// dayjs라이브러리에서 extend 함수는 플러그인을 datjs 인스턴스에 추가함
// relativeTime 은 플러그인 중 하나로 상대적 시간을 표현하는 기능임, 글이 작성되는 어느 곳이라면 다 필요할듯
// 클래스가 일종의 설계도나 틀 이라면, 인스턴스는 그 설계도를 바탕으로 만들어낸 실제 '물건', 붕어빵과 같은 느낌임

type Props = {
  noImage?: boolean;
};

export default function Post({ noImage }: Props) {
  const target = {
    postId: 1,
    User: {
      id: "elonmusk",
      nickname: "Elon Musk",
      image: "/yRsRRjGO.jpg",
    },
    content: "클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ",
    createdAt: new Date(),
    Images: [] as any[],
  };
  // faker -> 랜덤으로 이미지를 생성해주는 라이브러리로 쓰고 있음.
  //
  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      { imageId: 1, link: faker.image.urlLoremFlickr() },
      { imageId: 2, link: faker.image.urlLoremFlickr() },
      { imageId: 3, link: faker.image.urlLoremFlickr() },
      { imageId: 4, link: faker.image.urlLoremFlickr() }
    );
  }
  // math.random 이 0~1 사이의 소수점을 랜덤으로 뽑아내는 함수인데, 0.5보다 클 확률은 역시 반반이겠지
  // 근데 반반확률로 이미지를 추가하고 말고 를 정하는 코드인데 왜 굳이 .. ? 아아 글 올린 사람에 따라 이미지를 올릴수도 안올릴수도 있으니까~!
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
          <div className={style.postImageSection}>
            <PostImages post={target} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
