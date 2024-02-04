"use client";
import React from "react";
import styles from "./TrendSection.module.css";
import Trend from "./Trend";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { HashTag } from "@/model/HashTag";
import { getTrends } from "../_lib/getTrends";

export default function TrendSection() {
  // 트렌드 자체가 로그인을 했을 때만 데이터를 가져오는데, 아래 코드때문에 로그인을 안했을때도 데이터를 불러오게 됨, 그래서 수정을 해줘야함
  const pathname = usePathname();
  const { data: session } = useSession();

  const { data } = useQuery<HashTag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!session?.user,
    // 로그인한 유저가 정보가 없을 경우, trends 데이터 요청 비활성화.
    // !!  논리 연산자 session?.user 가 없을 경우 false 반환, ! 하나만 썼을 경우 값을 부정값으로 반환
  });

  if (pathname === "/explore") return null;
  if (session?.user) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => (
            <Trend trend={trend} key={trend.tagId} />
          ))}
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
