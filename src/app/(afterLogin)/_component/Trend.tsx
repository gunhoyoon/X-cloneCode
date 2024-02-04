"use client";
import { HashTag } from "@/model/HashTag";
import Link from "next/link";
import React from "react";
import styles from "./trend.module.css";
// 클릭하면 /search?q=트랜드키워드로 넘어감

type Props = {
  trend: HashTag;
};

export default function Trend({ trend }: Props) {
  return (
    <Link href={`/search?q=${trend?.title}`} className={styles.container}>
      <div className={styles.count}>실시간 트렌드</div>
      <div className={styles.title}>{trend?.title}</div>
      <div className={styles.count}>{trend?.count?.toLocaleString()} posts</div>
      {/* trend.count.toLocaleString() 을 사용하게 되면 값이 1천이 넘어가게 되면 콤마가 알아서 찍힘 */}
    </Link>
  );
}
// 데이터가 들어오기전까지 더미데이터 활용
