"use client";

import style from "../search.module.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Tab() {
  const [current, setCurrent] = useState("hot");
  // 탭의 현재 상태를 스테이트로 관리 , 상태를 가지고 있으니까 use client
  const router = useRouter();
  // 페이지 이동시켜주기 위해 useRouter
  const searchParams = useSearchParams();
  // 쿼리스트링 값을 가져오기 위해 search 컴포넌트에서 프롭으로 전달해줘도 되고, useSearchParams 를 사용해도 됨

  const onClickHot = () => {
    setCurrent("hot");
    router.replace(`/search?q=${searchParams.get("q")}`);
    // useSearchParams의 .get 함수를 사용해서 쿼리스트링의 값을 입력해주면 그 값을 가져올 수 있음
    // `/search?q=${가져온 값}`이 됨
  };
  const onClickNew = () => {
    setCurrent("new");
    router.replace(`/search?${searchParams.toString()}&f=live`);
    // 여기서 searchParams.toString() 은 searchParams의 쿼리값 전부 다 가져다 쓰고, 즉 지금 있는 값 다 쓰고 &f=live 붙여서 쓰겠다 할 때 사용
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div className={style.tabIndicator} hidden={current === "new"}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div className={style.tabIndicator} hidden={current === "hot"}></div>
        </div>
      </div>
    </div>
  );
}
