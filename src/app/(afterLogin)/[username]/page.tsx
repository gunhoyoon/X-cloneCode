import style from "./profile.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "../_component/BackButton";
// import BackButton from "@/app/(afterLogin)/_component/BackButton";
export default function Profile() {
  const user = {
    id: "YunGunHO",
    nickname: "윤건호",
    image: "/5Udwvqim.jpg",
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
