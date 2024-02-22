import { PostImage } from "./PostImage";
import { User } from "./User";

interface UserID {
  userId: string;
}

export interface Post {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
  Hearts: UserID[];
  Reposts: UserID[];
  Comments: UserID[];
  _count: {
    Hearts: number;
    Reposts: number;
    Comments: number;
  };
  Original?: Post; // 재게시
  Parent?: Post; // 답글
}

// 기본적인 Post의 타입은 객체 형태이고, 이걸 인피니티 스크롤링을 사용하기 때문에 [] 형태로 사용함
// 싱글 포스트를 사용하는 경우는 쿼리키가 ['posts'] 로 시작한다해도 배열의 형태가 아님.
// 그러니까 하트를 눌렀을 때 쿼리키 배열[0] === "posts"라고 해서 전부 배열이 아니라는거임, 싱글 객체 / 여러개 배열 형태의 예외처리가 필요함
