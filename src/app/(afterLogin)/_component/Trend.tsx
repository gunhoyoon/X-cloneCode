import Link from "next/link";
import React from "react";
import styles from "./trend.module.css";
// 클릭하면 /search?q=트랜드키워드로 넘어감
export default function Trend() {
  return (
    <Link href={`/search?q=${"트렌드"}`} className={styles.container}>
      <div className={styles.count}>실시간 트렌드</div>
      <div className={styles.title}>윤건호</div>
      <div className={styles.count}>1,234 posts</div>
    </Link>
  );
}
// 데이터가 들어오기전까지 더미데이터 활용
