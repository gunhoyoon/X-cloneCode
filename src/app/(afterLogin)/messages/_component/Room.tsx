"use client";

import style from "@/app/(afterLogin)/messages/message.module.css";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { Room } from "@/model/Room";

dayjs.locale("ko");
dayjs.extend(relativeTime);
// dayjs 사용 시 , 페이지마다 사용해줘야함 locale , extend

type Props = {
  room: Room;
};
export default function Room({ room }: Props) {
  console.log(room);
  const router = useRouter();

  const onClick = () => {
    router.push(`/messages/${room.room}`);
    // user.Messages.at(-1)? 을 평가해서 해당 객체가 있다면 , 그 id로 이동하겠다.
  };

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={room?.Receiver.image} alt="" />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{room.Receiver.nickname}</b>
          &nbsp;
          <span>@{room.Receiver.id}</span>
          &nbsp; · &nbsp;
          <span className={style.postDate}>
            {dayjs(room.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>
          {room.Receiver.nickname}
          {/* at(-1)은 채팅방의 경우 리스트에서 볼 때 가장 마지막에 보낸 대화가 보여지기 때문에 그 배열의 마지막을 보여지게하기 위해서 사용 */}
        </div>
      </div>
    </div>
  );
}
