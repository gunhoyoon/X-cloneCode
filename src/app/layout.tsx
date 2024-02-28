import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthSession from "./_component/AuthSession";
import MSWComponent from "./_component/MSWComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Z. 무슨 일이 일어나고 있나요? / Z",
  description: "Z.com inspired by X.com",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWComponent />
        <AuthSession>{children}</AuthSession>
        {/* useSession 을 사용하기 위해서 Session Provider 로 감싸주기 */}
      </body>
    </html>
  );
}
