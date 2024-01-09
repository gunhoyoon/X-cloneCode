import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import ZLogo from "../../../public/zlogo.png";
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogoutButton";
import TrendSection from "./_component/TrendSection";
import FollowRecommend from "./_component/FollowRecommend";
import RightSearchZone from "./_component/RightSearchZone";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}>
          <div className={styles.leftSectionFixed}>
            <Link className={styles.logo} href="/">
              <div className={styles.logoPill}>
                <Image src={ZLogo} alt="z-com.logo" width={40} height={40} />
              </div>
            </Link>
            <nav>
              <ul>
                <NavMenu />
              </ul>
              <Link href="/compose/tweet" className={styles.postButton}>
                게시하기
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionInner}>
          <main className={styles.main}>{children}</main>
          <section className={styles.rightSection}>
            <RightSearchZone />
            <TrendSection />
            <div className={styles.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  );
}

// after 로그인 레이아웃이고, 해당 페이지는 주소창에 영향끼치지 않음. 근데 home보다는 상위 리렉토리이므로
// 해당 파일에서 칠드런을 받아줘야 다음 라우터가 진행됨
// 레이아웃 == 칠드런이 있어야됨 , 해당 페이지레벨에서 끝날게 아니잖아
// 여기서 칠드런을 안써주면 이 내부로 못들어간다는걸 보면, (afterLogin) 을 거친다는걸 알 수 있음
// 폴더 하나별로 레이아웃을 둘 수 있으니 제로초는 그걸 주로 사용하게 된다고 함
// 이건 해당 페이지마다 보여주고 싶은게 조금씩 다르거나, 있어서 ?
