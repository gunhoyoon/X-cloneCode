"use client";
import React, { useContext } from "react";
import styles from "./tab.module.css";
import { TabContext } from "./TabProvider";
export default function Tab() {
  const { tab, setTab } = useContext(TabContext);
  // useState가 아니라 context api 로 만들어둔 탭의 상태를 가져와서, setTab 으로 Tab의 상태를 바꿔줌
  // 해당 컴포넌트에서는 탭의 값을 업데이트해주고, 그에 따른 탭 ui만 바꿔주면 됨
  const onClickRec = () => {
    setTab("rec");
  };
  const onClickFol = () => {
    setTab("fol");
  };
  // useState로 탭의 상태를 갖고 있는게 아니라, useContext에서 provider로 넘긴 useState의 tab , setTab을 업데이트 해줌, 그럼 탭 프로바이더로 감싼 컴포넌트들의 tab 상태는 다 바뀌는거임?

  // 기본적으로 둘 다 밑줄을 갖고 있는데 클릭된 친구 hidden true로 안보이게

  return (
    <div className={styles.homeFixed}>
      <div className={styles.homeText}>홈</div>
      <div className={styles.homeTab}>
        <div onClick={onClickRec}>
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
