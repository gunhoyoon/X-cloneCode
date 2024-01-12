"use client";

import style from "@/app/(afterLogin)/messages/messages.module.css";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);
// dayjs 사용 시 , 페이지마다 사용해줘야함 locale , extend
export default function Room() {
  const router = useRouter();
  const user = {
    id: "hero",
    nickname: "영웅",
    Messages: [
      { roomId: 123, content: "안녕하세요.", createdAt: new Date() },
      { roomId: 123, content: "안녕히가세요.", createdAt: new Date() },
    ],
  };

  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
    // user.Messages.at(-1)? 을 평가해서 해당 객체가 있다면 , 그 id로 이동하겠다.
  };

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={faker.image.avatar()} alt="" />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp; · &nbsp;
          <span className={style.postDate}>
            {dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>
          {user.Messages?.at(-1)?.content}
          {/* at(-1)은 채팅방의 경우 리스트에서 볼 때 가장 마지막에 보낸 대화가 보여지기 때문에 그 배열의 마지막을 보여지게하기 위해서 사용 */}
        </div>
      </div>
    </div>
  );
}
