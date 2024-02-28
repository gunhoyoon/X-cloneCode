"use client";
import React, { MouseEventHandler } from "react";
import BackButton from "./BackButton";
import style from "../[username]/profile.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/model/User";
import { getUserClient } from "../[username]/_lib/getUser";
import cx from "classnames";
import { Session } from "next-auth";
type Props = {
  username: string;
  session: Session | null;
};
export default function UserInfo({ username, session }: Props) {
  // console.log("username", username);
  console.log("session", session);
  const queryClient = useQueryClient();
  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >(
    // 제네릭에 들어간<User , Object , User>은 useQuery 를 사용했을 때 리턴값, Object은 모든 다 포함(error에 관한 타입 처리임 우선 이렇게 처리해둠)
    {
      queryKey: ["users", username], // [_1: string, _2 : string] 은 queryKey에 관한 타입
      queryFn: getUserClient,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    }
  );
  //   console.dir(error); 에러는 객체 형태/ 상세하게 보기 위해서 dir 찍음(디렉토리)
  // console.log("user", user); 현재 내가 보고있는 프로필 페이지, [username의 데이터]
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
  // 팔로우를 누르면, 팔로우된
  const followed = !!user?.Followers?.find(
    (v) => v.id === session?.user?.email
  );
  console.log("followed", followed);

  const follow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          method: "post",
          credentials: "include",
        }
      );
    },
    onMutate: (id: string) => {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      console.log("value", value);
      // users/followRecommends 는 추천인이고, 그 아이디들이 각각나옴 (우측 추천인창)
      // 그 한명한명의 아이디랑, id 현재 보고있는 username의 아이디, 그래서 현재 보고있는 프로필 페이지와 추천창에 있는 유저가 같냐
      // 그에 따른 ui 처리도 필요하기 때문에 이런 조건이 필요함

      if (value) {
        const index = value.findIndex((v) => v.id === id);
        const hasId = index > -1;
        if (hasId) {
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: [{ id: session?.user?.email as string }],
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }

      const value2: User | undefined = queryClient.getQueryData(["users", id]);
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", id], shallow);
      }
    },
    onSuccess: () => {
      // queryClient.invalidateQueries('userData');
      console.log("sadasdss");
    },
    onError: (error, id: string) => {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);

      if (value) {
        const index = value.findIndex((v) => v.id === id);
        const hasId = index > -1;
        if (hasId) {
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: shallow[index].Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }

      const value2: User | undefined = queryClient.getQueryData(["users", id]);
      if (value2) {
        const shallow = {
          ...value2,
          Followers: value2.Followers.filter(
            (v) => v.id !== session?.user?.email
          ),
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["users", id], shallow);
      }
    },
  });

  const unFollow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          method: "delete",
          credentials: "include",
        }
      );
    },
    onMutate: (id: string) => {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === id);
        const hasId = index > -1;
        if (hasId) {
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: shallow[index].Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }
      const value2: User | undefined = queryClient.getQueryData(["users", id]);
      if (value2) {
        const shallow = {
          ...value2,
          Followers: value2.Followers.filter(
            (v) => v.id !== session?.user?.email
          ),
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["users", id], shallow);
      }
    },
    onError: (error, id: string) => {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === id);
        const shallow = [...value];
        const hasId = index > -1;
        if (hasId) {
          shallow[index] = {
            ...shallow[index],
            Followers: [{ id: session?.user?.email as string }],
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }

      const value2: User | undefined = queryClient.getQueryData(["users", id]);
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", id], shallow);
      }
    },
  });

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (session?.user === null) {
      return alert("로그인 후 사용할 수 있습니다");
    }

    // console.log("followed", followed);
    if (followed) {
      unFollow.mutate(user?.id as string);
    } else {
      follow.mutate(user?.id as string);
    }
  };
  if (!user) return null;
  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userRow}>
          <div className={style.userImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.image} alt={user.id} />
          </div>
          <div className={style.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          {session && session.user?.email !== username && (
            <button
              onClick={onFollow}
              className={cx(style.followButton, followed && style.followed)}
            >
              {followed ? "팔로잉" : "팔로우"}
            </button>
          )}
        </div>
        <div className={style.followZone}>
          <div>{user._count.Followers} 팔로워</div>
          &nbsp;
          <div>{user._count.Followings} 팔로우 중</div>
        </div>
      </div>
    </>
  );
}
