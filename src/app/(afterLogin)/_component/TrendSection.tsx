"use client";
import React from "react";
import styles from "./TrendSection.module.css";
import Trend from "./Trend";
import { usePathname } from "next/navigation";
export default function TrendSection() {
  const pathname = usePathname();
  if (pathname === "/explore") return null;

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
}
