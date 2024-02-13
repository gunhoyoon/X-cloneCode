"use client";
import React, { useRef, useEffect } from "react";

export default function Header() {
  const ref = useRef(null);

  useEffect(() => {
    let count = 1;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("isIntersecting : true 시 count 증가", (count += 1));
            entry.target.innerHTML += " 보여질 때 텍스트 추가";
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    // 컴포넌트가 언마운트될 때 관찰을 중지합니다.
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <>
      <div style={{ height: 500, backgroundColor: "violet" }}>header</div>
      <div ref={ref} style={{ height: 800, backgroundColor: "pink" }}>
        Hi
      </div>
    </>
  );
}

// IntersectionObserver 인스턴스 할당
// entries에 observer.observe(element) 요소에 관한 객체로 이루어진 배열이 들어가게 됨
// 콜백함수에 들어간 entries이 담고 있는 요소가 뷰포트와의 교차상태에 변화가 있을 때 마다 호출된다.
// target: 교차 감지가 수행되는 실제 DOM 요소.
// isIntersecting: 대상 요소가 루트 요소와 교차하는지 여부를 나타내는 불리언 값.
// intersectionRatio: 대상 요소가 루트 요소와 얼마나 교차하고 있는지를 나타내는 숫자로, 0에서 1 사이의 값입니다.

// forEach로 요소 하나하나 순회
// 대상 요소 50% 가 뷰포트에 들어가거나 나갈 때 콜백함수를 호출하겠다.
// 추가적인 옵션으로 root = 기본값은 브라우저 뷰포트가 되고, 특정 요소의 뷰포트를 사용하고 싶을 때 사용
// rootMargin = root 뷰포트의 마진을 조정할 수 있음 root 뷰포트의 실제 경계를 확장 , 축소 가능
