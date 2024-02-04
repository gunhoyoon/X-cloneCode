"use client";
import { User } from "@/model/User";
import React from "react";
import styles from "./FollowRecommend.module.css";

type Props = {
  user: User;
};

export default function FollowRecommend({ user }: Props) {
  const onFollow = () => {};
  // const user = {
  //   id: "elonMusk",
  //   nickname: "Elon Musk",
  //   image: "/yRsRRjGO.jpg",
  // };
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
