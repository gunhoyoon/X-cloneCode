import React from "react";
import HomePage from "../../home/page";

export default function TweetPage() {
  return <HomePage />;
}

// 해당 페이지가 afterLogin 의 layout의 children 에 들어감
// 즉 인터샙팅 + 페러셀로 띄워질 모달의 배경이 되는거임, 칠드런 + 모달이 한 페이지에 그려지는 개념과 같음
