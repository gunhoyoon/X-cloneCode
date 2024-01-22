"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import style from "./logoutButton.module.css";
export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession(); // 클라이언트에서 useSession 사용해서 내 정보 불러오기
  console.log(me, "me");
  // 반환값 : user = {email : YunGunHo , image : "/5Udwvqim.jpg", name "윤건호"}

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
        <img src={me.user?.image as string} alt={me.user?.email as string} />
        {/* me.user.image 가 undefined 일 수 있다. 해서 as string 으로 스트링 타입이라고 개발자가 명시해주는거임 */}
        {/* 또는 me.user.image! 이런 식으로 타입 단언을 해줄 수 있음  */}
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
