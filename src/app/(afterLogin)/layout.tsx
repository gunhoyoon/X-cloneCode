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
import { auth } from "@/auth";
import RQProvider from "./_component/RQProvider";
import FollowRecommendsSection from "./home/_component/FollowRecommendsSection";
type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default async function AfterLoginLayout({ children, modal }: Props) {
  const session = await auth();

  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}>
          <div className={styles.leftSectionFixed}>
            <Link className={styles.logo} href={session?.user ? "/home" : "/"}>
              <div className={styles.logoPill}>
                <Image src={ZLogo} alt="z-com.logo" width={40} height={40} />
              </div>
            </Link>
            {session?.user && (
              <>
                <nav>
                  <ul>
                    <NavMenu />
                  </ul>
                  <Link href="/compose/tweet" className={styles.postButton}>
                    <span>게시하기</span>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="r-jwli3a r-4qtqp9 r-yyyyoo r-1472mwg r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
                    >
                      <g>
                        <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                      </g>
                    </svg>
                  </Link>
                </nav>
                <LogoutButton />
              </>
            )}
          </div>
        </section>
      </header>
      <RQProvider>
        <div className={styles.rightSectionWrapper}>
          <div className={styles.rightSectionInner}>
            <main className={styles.main}>{children}</main>
            <section className={styles.rightSection}>
              <RightSearchZone />
              <TrendSection />
              <div className={styles.followRecommend}>
                <h3>팔로우 추천</h3>
                <FollowRecommendsSection />
                {/* <FollowRecommend /> */}
                {/* <FollowRecommend /> */}
                {/* <FollowRecommend /> */}
                {/* useQuery 를 쓰기 위해서 분리를 해줌 followRecommend Section을 만들어줌 
                기존 FollowRecommend, FollowRecommend 를 여러개 사용할게 아니기 때문에, 데이터만큼 컴포넌트 map 으로 표시 */}
              </div>
            </section>
          </div>
        </div>
        {modal}
      </RQProvider>
    </div>
  );
}

// after 로그인 레이아웃이고, 해당 페이지는 주소창에 영향끼치지 않음. 근데 home보다는 상위 리렉토리이므로
// 해당 파일에서 칠드런을 받아줘야 다음 라우터가 진행됨
// 레이아웃 == 칠드런이 있어야됨 , 해당 페이지레벨에서 끝날게 아니잖아
// 여기서 칠드런을 안써주면 이 내부로 못들어간다는걸 보면, (afterLogin) 을 거친다는걸 알 수 있음
// 폴더 하나별로 레이아웃을 둘 수 있으니 제로초는 그걸 주로 사용하게 된다고 함
// 이건 해당 페이지마다 보여주고 싶은게 조금씩 다르거나, 있어서 ?
