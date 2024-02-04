import React from "react";
import SearchForm from "../_component/SearchForm";
import styles from "./explore.module.css";
import TrendSection from "./_component/trendSection";
export default function ExplorePage() {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
      </div>
      <div className={styles.trend}>
        <h3>나를 위한 트렌드</h3>
        <TrendSection />
      </div>
    </main>
  );
}
