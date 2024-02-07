"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import styles from "./rightSearchZone.module.css";
import SearchForm from "./SearchForm";
export default function RightSearchZone() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangeFollow = () => {
    // let url = `/search?q=${searchParams.get("q")}&pf=on`;
    // if (searchParams.has("f")) {
    //   url += `&f=${searchParams.get("f")}`;
    // }
    // router.replace(url);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("pf", "on");
    router.replace(newSearchParams.toString());
    // new URLSearchParam 자체를 console.log에 찍게 되면 인스턴스 자체가 나오기 때문에,
    // 이걸 url 주소로 사용하기 위해선 toString() 을 붙여줘야된다.
  };

  const onChangeAll = () => {
    // let url = `/search?q=${searchParams.get("q")}`;
    // if (searchParams.has("f")) {
    //   // searchParams.has() 의 반환이 불리언이기 때문에 명확한 식을 넣어주는게 좋음
    //   url += `&f=${searchParams.get("f")}`;
    // }
    // router.replace(url);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("pf");
    router.replace(newSearchParams.toString());
  };

  const pathname = usePathname();
  // console.log(searchParams, "searchParams");
  // useSearchParams로 가져오는 데이터는 searchParams.get('q')를 넣어서 해당 쿼리에 관한 데이터를 받아옴
  // getAll은 getAll('q') 이렇게 사용하고 q에 관한 데이터를 전부 다 가져오는거임. 서치파람스처럼 전부 다 가져오는게 아니라.

  if (pathname === "/explore") return null;
  if (pathname === "/search") {
    return (
      <div>
        {/* 실제 트위터가 사용하는 라디오 버튼도 마찬가지로 인풋을 숨기고 커스텀 버튼 사용하는거처럼
        라디오 버튼 인풋 레프로 연결해서 잡아두고 div 하나 만들어서 그거 스타일로 꾸민거임 아아아 이렇게 하는거였구나.....!!!!! */}
        <h5 className={styles.filterTitle}>검색 필터</h5>
        <div className={styles.filterSection}>
          <div>
            <label>사용자</label>
            <div className={styles.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
              />
            </div>
            <div className={styles.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}
