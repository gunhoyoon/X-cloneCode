"use client";
import React from "react";
import BackButton from "./BackButton";
import style from "../[username]/profile.module.css";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/model/User";
import { getUser } from "../[username]/_lib/getUser";

type Props = {
  username: string;
};
export default function UserInfo({ username }: Props) {
  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >(
    // 제네릭에 들어간<User , Object , User>은 useQuery 를 사용했을 때 리턴값, Object은 모든 다 포함(error에 관한 타입 처리임 우선 이렇게 처리해둠)
    {
      queryKey: ["users", username], // [_1: string, _2 : string] 은 queryKey에 관한 타입
      queryFn: getUser,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    }
  );
  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필 </h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div className={style.notFoundUser}>계정이 존재하지 않음</div>
      </>
    );
  }
  if (!user) return null;

  return (
    <>
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
    </>
  );
}
