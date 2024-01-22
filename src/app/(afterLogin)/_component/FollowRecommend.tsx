"use client";
import React from "react";
import styles from "./FollowRecommend.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FollowRecommend() {
  const route = useRouter();
  const { data } = useSession();
  const onFollow = () => {
    if (!data?.user) {
      route.replace("/login");
    }
  };
  const user = {
    id: "elonMusk",
    nickname: "Elon Musk",
    image: "/yRsRRjGO.jpg",
  };
  return (
    <div className={styles.container}>
      <div className={styles.userLogoSection}>
        <div className={styles.userLogo}>
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.title}>{user.nickname}</div>
        <div className={styles.count}>@{user.id}</div>
      </div>
      <div className={styles.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  );
}
