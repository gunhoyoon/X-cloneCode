import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import ZLogo from "../../../public/zlogo.png";
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogoutButton";
import TrendSection from "./_component/TrendSection";
import FollowRecommend from "./_component/FollowRecommend";

type Props = {
  children: React.ReactNode;
};

export default function AfterLoginLayout({ children }: Props) {
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
            <div style={{ marginBottom: 60, width: "inherit" }}>
              <form action="" className={styles.search}>
                <svg width={20} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                  </g>
                </svg>
                <input type="search" />
              </form>
            </div>
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
    </div>
  );
}

// 에프터 로그인 레이아웃이고, 해당 페이지는 주소창에 영향끼치지 않음. 근데 home보다는 상위 리렉토리이므로
// 해당 파일에서 칠드런을 받아줘야 다음 라우터가 진행됨
// 레이아웃 == 칠드런이 있어야됨 , 해당 페이지레벨에서 끝날게 아니잖아
// 여기서 칠드런을 안써주면 이 내부로 못들어간다는걸 보면, (afterLogin) 을 거친다는걸 알 수 있음
// 폴더 하나별로 레이아웃을 둘 수 있으니 제로초는 그걸 주로 사용하게 된다고 함
// 이건 해당 페이지마다 보여주고 싶은게 조금씩 다르거나, 있어서 ?
