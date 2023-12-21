import React from "react";
import styles from "@/app/page.module.css";
// styles import 해오는 주소 중 @ 은 src 를 의미함,
type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      비포 로그인 레이아웃
      {children}
      {/* 같은 레벨의 page는 children 을 통해 보여지게 되고 */}
      {modal}
      {/* @modal의 page는 modal을 통해 보여지게 된다 */}
    </div>
  );
}

// - 페러렐
// {children} 에서 보여지게 되는건 i 폴더 안의 page.tsx(modal 폴더 x) , login > page.tsx , page.tsx
// modal 에서 보여지는 페이지는 modal 폴더 내부의 페이지가 됨

// 화면상엔 비포 로그인 레이아웃 > 같은 레벨 page > modal(페러렐 모달) 순으로 나오게 됨

// 여기서 레이아웃이 필요한 이유는, 페레럴 라우트를 사용하기 위해서 파일이 서로 같은 폴더 내에 있어야됨.
// 그래서 before  안에 들어가있는 모달 페이지랑, 루트에 있는 페이지를 동시에 띄울 수 없기 때문에
// 해당 폴더 내에 들어와서 레이아웃 + 페이지를 만들어서 동시에 그릴 수 있게 함
// 그리고 레이아웃을 따로 가지게 할 경우 children 을 통해야만 같은 레벨의 page도 보여질 수 있는거임, 안그럼 레이아웃만 보여지고 끝남
// (before)폴더의 page가 layout을 통해 @modal 폴더 내 page와 같이 보이지게 되는 거임

// - 인터셉팅 라우팅 // 클라이언트에서만 적용 , 여기서 @modal 을 페러렐 라우팅이라고 생각하면 편함, children에 그려지는게 아닌 modal 에 그려짐
// 해당 layout에서의 children이 같은 레벨의 page가 되고,
// 원래는 메인에서 /i/flow/login 을 하게 되며 기존에 가까운 경로인 i/flow/login 으로 넘어가게 되는데
// 인터셉팅 라우팅 (.)i 를 통해서 modal안에 i/flow/login이 보여지게 됨
// 근데? 이 login은 인터셉팅과 동시에 페러  렐(모달형태)임. 그렇기 때문에 경로가 바뀌면서도 메인페이지도 그대로 남아있고, 인터셉팅한 모달도 뜰 수 있는거임
// 메인에서 로그인 클릭하면 /i/flow/login 으로 넘어와야하는데 이걸 (.)i 가 훔쳤음 그래서 지가 보여지고 얜 또 페러렐에 모달처럼 띄워놓은 애라 경로가 바뀌면서 메인페이지도 같이 보여지게 되는거임
// 근데 이렇게 해서 이점이 뭐임?

// 사실상 인터셉팅 + 페러렐 합친 작품임.
