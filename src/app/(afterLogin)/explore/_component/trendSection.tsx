"use client";
import { HashTag } from "@/model/HashTag";
import { useQuery } from "@tanstack/react-query";
import Trend from "../../_component/Trend";
import { getTrends } from "../../_lib/getTrends";

export default function TrendSection() {
  const { data } = useQuery<HashTag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return (
    <>
      {data?.map((trend) => (
        <Trend trend={trend} key={trend.tagId} />
      ))}
    </>
  );
}

// afterLogin 의 trendSection과 같은 키를 사용해서 데이터를 불러오지만,
// ui가 달라 재사용하기 어려워서 새로 만들어서 사용, 같은 데이터를 호출해서 2번 불러오는거 같지만 키가 하나기 때문에 사실 한번의 처리가 이루어짐
