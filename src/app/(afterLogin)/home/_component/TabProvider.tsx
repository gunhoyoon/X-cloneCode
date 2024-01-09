"use client";
import React, { createContext, ReactNode, useState } from "react";

export const TabContext = createContext({
  tab: "rec",
  setTab: (value: "rec" | "fol") => {},
});
// context 초기값, 명확하게 들어갈수록 좋을듯 타입 정의할 때도

type Props = {
  children: ReactNode;
};
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState<"rec" | "fol">("rec");
  // 초기타입 일치 tab , setTab의 경우 rec , fol 둘 중 하나로 업데이트 되니까 값 할당
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}

// 탭의 상태를 가지고 있어야하는데 여기서 context api로
// 텝 컴포넌트에서 직접 프로바이더를 가지고 있을 것임
// 탭 , 포스트 폼 , 포스트를 감싸서 해당 상태를 전달해줄거임
//
