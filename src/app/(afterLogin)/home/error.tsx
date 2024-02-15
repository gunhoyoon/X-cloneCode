"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
// afterLogin -> home 에서 일어나는 에러처리
// 단순히 home 이 아니라 서버 컴포넌트에서 일어나는 에러를 처리하는거임
// client에서 일어나는 에러는 const {data , isError} = useQuery() 사용하게 될 때 isError 로 잡아서 처리해야됨
