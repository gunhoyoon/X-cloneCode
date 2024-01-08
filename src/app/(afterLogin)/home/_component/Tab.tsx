"use client";
import React, { useState } from "react";
import styles from "./tab.module.css";
export default function Tab() {
  const [tab, setTab] = useState("rec");
  const onClickRec = () => {
    setTab("rec");
  };
  const onClickFol = () => {
    setTab("fol");
  };
  console.log(tab, "");
  {
    /* 기본적으로 둘 다 밑줄을 갖고 있는데 클릭된 친구 hidden true로 안보이게*/
  }
  return (
    <div className={styles.homeFixed}>
      <div className={styles.homeText}>홈</div>
      <div className={styles.homeTab}>
        <div onClick={onClickRec}>
          추천
          <div className={styles.tabIndicator} hidden={tab === "fol"}>
            {/* 텝이 fol 라면 indicator 텝 선택 시 밑줄 숨김, 이 div는 엑티브 밑줄 */}
          </div>
        </div>
        <div onClick={onClickFol}>
          팔로우 중
          <div className={styles.tabIndicator} hidden={tab === "rec"}>
            {/* 텝이 fol 라면 indicator 텝 선택 시 밑줄 숨김, 이 div는 엑티브 밑줄 */}
          </div>
        </div>
      </div>
    </div>
  );
}
