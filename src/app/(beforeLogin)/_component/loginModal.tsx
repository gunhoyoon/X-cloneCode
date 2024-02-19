"use client";

import style from "@/app/(beforeLogin)/_component/login.module.css";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage("");
    const response = await signIn("credentials", {
      username: id,
      password,
      redirect: false,
      // 해당 옵션은 서버쪽 redirect 설정이기 때문에, false 로 설정하고
    });
    // console.log("response", response);
    // error 일때 CredentialsSignin, error 아닐 때 null
    if (response?.error === "CredentialsSignin") {
      setMessage("아이디와 비밀번호가 일치하지 않습니다.");
    } else {
      router.replace("/home");
    }
    // 진단 파악 , 비슷한 이슈 찾아보기
    // next??

    // try {
    //   console.log("here");
    //   const response = await signIn("credentials", {
    //     username: id,
    //     password,
    //     redirect: false,
    //     // 해당 옵션은 서버쪽 redirect 설정이기 때문에, false 로 설정하고
    //   });
    //   console.log("here2", response);
    //   router.replace("/home");
    // } catch (err) {
    //   console.log("here3");
    //   console.error(err);
    //   setMessage("아이디와 비밀번호가 일치하지 않습니다.");
    // } // 디비에 없는 아이디로 로그인 요청했을 경우
  };
  const onClickClose = () => {
    router.back();
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button className={style.closeButton} onClick={onClickClose}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={style.input}
                value={id}
                onChange={onChangeId}
                type="text"
                placeholder=""
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={style.input}
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder=""
              />
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!id && !password}>
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// 공통적으로 사용되는 컴포넌트를 프라이빗 폴더(_component)를 만들어서 각각 임포트 함 / 경로에 아무런 영향을 주지 않음
