"use client";
import { useRouter } from "next/navigation";
import React, { FormEventHandler } from "react";
import styles from "./searchForm.module.css";
type Props = {
  q?: string;
};
export default function SearchForm({ q }: Props) {
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    router.push(`/search?q=${event.currentTarget.search.value}`);
  };
  return (
    <form action="" className={styles.search} onSubmit={onSubmit}>
      <svg width={20} viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
        </g>
      </svg>
      <input name="search" type="search" />
    </form>
  );
}
// 이렇게 해서 검색을 통해 쿼리값을 넣어줄 수 있지만, 검색을 자주하게 되면 리액트 쿼리로 불러오는 데이터가 너무 많기 때문에,
// 캐시타임을 짧게 해서 주기적으로 데이터를 삭제할 수 있게끔해야함
