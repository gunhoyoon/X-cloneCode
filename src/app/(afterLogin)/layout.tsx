import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AfterLoginLayout({ children }: Props) {
  return (
    <div>
      에프터 로그인 레이아웃 / 로그인 후 레이아웃은 이곳에 그릴거임
      {children}
    </div>
  );
}

// 에프터 로그인 레이아웃이고, 해당 페이지는 주소창에 영향끼치지 않음. 근데 home보다는 상위 리렉토리이므로
// 해당 파일에서 칠드런을 받아줘야 다음 라우터가 진행됨
// 레이아웃 == 칠드런이 있어야됨 , 해당 페이지레벨에서 끝날게 아니잖아
// 여기서 칠드런을 안써주면 이 내부로 못들어간다는걸 보면, (afterLogin) 을 거친다는걸 알 수 있음
// 폴더 하나별로 레이아웃을 둘 수 있으니 제로초는 그걸 주로 사용하게 된다고 함
// 이건 해당 페이지마다 보여주고 싶은게 조금씩 다르거나, 있어서 ?
