"use client";
import React from "react";
import styles from "./TrendSection.module.css";
import Trend from "./Trend";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
export default function TrendSection() {
  const pathname = usePathname();
  const { data } = useSession();

  if (pathname === "/explore") return null;
  if (data?.user) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>
          <h3>나를 위한 트렌드</h3>
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.trendBg}>
        <div className={styles.noTrend}>트렌드를 볼 수 없습니다.</div>
      </div>
    );
  }
}
