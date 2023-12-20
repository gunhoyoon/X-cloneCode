import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div>
      <div>
        해당 페이지는 존재하지 않는 페이지입니다. 다른 페이지를 검색하세요.
        <Link href="/search">검색</Link>
      </div>
    </div>
  );
}
