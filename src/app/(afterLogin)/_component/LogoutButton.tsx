"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import style from "./logoutButton.module.css";
import { Session } from "@auth/core/types";
import { QueryClient } from "@tanstack/react-query";

type Props = {
  me: Session | null;
};

export default function LogoutButton({ me }: Props) {
  const router = useRouter();
  const queryClient = new QueryClient();
  // const { data: me } = useSession();
  // 클라이언트에서 useSession 사용해서 내 정보 불러오기
  // 처음 회원가입하고, signIn 시켜주고 홈으로 redirect 시켜줌
  // 클라이언트 측 useSession 을 통해 세션 정보를 저장하고 캐싱할 수 있는데.이 캐시가 업데이트 되는 데에 시간이 걸려.
  // 최신정보를 바로 받아오지 못할 수 있음. 그래서 서버에서 직접 props으로 넘겨줘서 사용
  // console.log(me, "me");
  // 반환값 : user = {email : YunGunHo , image : "/5Udwvqim.jpg", name "윤건호"}
  // 서버에서 데이터가

  const onLogOut = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
    signOut({ redirect: false }) //
      .then(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
          method: "post",
          credentials: "include",
        });
        // 백엔드쪽에서도 완전히 로그아웃(쿠키 삭제), 클라이언트쪽에선 signOut이 하면 클라이언트 쿠키 삭제해줌
        // const handleLogout = async () => {
        //   // 사용자 정의 쿠키 제거
        //   document.cookie = 'myCustomCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        //   // NextAuth.js 로그아웃
        //   await signOut({ redirect: false });
        // }; 예시
        router.replace("/");
      });
  };
  const hasUserInfo = me && me.user; // !me?.user

  if (!hasUserInfo) {
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
