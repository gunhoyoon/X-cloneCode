import React from "react";
import Image from "next/image";
import styles from "./main.module.css";
import zLogo from "../../../../public/zlogo.png";
import Link from "next/link";

export default function Main() {
  // 메인은 화면만 가지고 있고, 재사용할 부분은 화면만 재사용할거. login에서 사용하는 main에선 접근 시 리다이렉트 필요함
  return (
    <>
      <div className={styles.left}>
        <Image src={zLogo} alt="logo" />
        {/* Nextjs 상 이미지, 내가 가지고 있는 이미지 파일을 사용하면 최적화를 해주는 장점이 있다. width , height 값 입력 x*/}
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  );
}

// 처음 사용하고 있던 redirect는 use client 를 붙여주지 않고 있어서 서버 컴포넌트임
// 근데 서버에서 사용하는 리다이렉트는 인터셉팅 라우트가 제대로 되지않음. 인터셉팅 라우트는 클라이언트에서 링크를 통해서 인터셉팅 해야 제대로 동작함.
// 인터셉팅 라우터를 사용하려면 클라이언트 컴포넌트에서 해야함

// route.push : localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// push 의 경우 히스토리가 남아서 뒤로가기를 누르면 다시 login 으로 가고 여기선 다시 i/flow/login 으로 보내니까 끝없이 왔다갔다하게 됨.

// route.replace : localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// replace는 히스토리가 남지 않음 , 경로를 저렇게 이동했다해도
// localhost:3000 ->  localhost:3000/i/flow/login , 다음과 같이 히스토리가 남지 않는다.

// 근데 여기서 문제는 로그인 버튼 > login 으로 보내고 > i/flow/login 이기 때문에 , layout에서 children 통해 나오는 페이지가
// login 이 되고, modal이 i/flow/login 이라 결국 메인 페이지가 배경에 나오기 위해서는 배경이 되는 로그인 페이지를 메인이랑 같게 만들어줘여함
// 그러니까 칠드런을 통해서 들어가는 페이지가 뭔지를 생각해보고, modal이 어느 페이지 위에서 나오게 되는지를 생각해봐야한다.
