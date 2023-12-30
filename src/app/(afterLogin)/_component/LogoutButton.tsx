"use client";
import style from "./logoutButton.module.css";
export default function LogoutButton() {
  const onLogOut = () => {};
  const me = {
    image: "/5Udwvqim.jpg",
    id: "1",
    nickName: "윤건호",
  };
  return (
    <button className={style.logOutButton} onClick={onLogOut}>
      <div className={style.logOutUserImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickName}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}
