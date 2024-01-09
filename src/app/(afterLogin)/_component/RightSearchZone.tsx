"use client";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./rightSearchZone.module.css";
import SearchForm from "./SearchForm";
export default function RightSearchZone() {
  const onChangeAll = () => {};

  const onChangeFollow = () => {};

  const pathname = usePathname();

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
