"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import style from "./logoutButton.module.css";
export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession(); // 클라이언트에서 useSession 사용해서 내 정보 불러오기
  const onLogOut = () => {
    signOut({ redirect: false }) //
      .then(() => {
        router.replace("/");
      });
  };
  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogOut}>
      <div className={style.logOutUserImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={me.user?.image as string} alt={me.user?.id} />
        {/* me.user.image 가 undefined 일 수 있다. 해서 as string 으로 스트링 타입이라고 개발자가 명시해주는거임 */}
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.id}</div>
      </div>
    </button>
  );
}
