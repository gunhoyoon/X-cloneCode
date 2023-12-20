import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import zLogo from "../../public/zlogo.png";
export default function Home() {
  return (
    <div>
      <div>
        <Image src={zLogo} alt="logo" />
        {/* Nextjs 상 이미지, 내가 가지고 있는 이미지 파일을 사용하면 최적화를 해주는 장점이 있다. */}
        <div>
          <h1>지금 일어나고 있는 일</h1>
          <h2>지금 가입하세요.</h2>
          <Link href="/i/flow/signup">계정 만들기</Link>
          <h3>이미 트위터에 가입하셨나요?</h3>
          <Link href="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
}
