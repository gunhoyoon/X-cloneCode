import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import cookie from "cookie";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  callbacks: {
    async authorized({ request, auth }) {
      if (!auth) {
        return NextResponse.redirect("http://localhost:3000/i/flow/login");
      }
      return true;
    },
  },
  // middleware에 설정해놓은 코드가 제대로 동작하지 않아서 직접 작성했지만, 버전5 올라오면서 잘 되는듯?
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
          //credentials안에 username, password가 고정으로 들어가있음. 그래서 username의 이름을 id로 바꿔줌
        });
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
        }

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        // authResponse.json() 에 유저 정보가 들어가 있음
        // 해당 유저 정보가 next auth에서 지금 로그인한 유저의 정보를 가져오는 기능을 사용할 때 여기들어간 유저의 값이 리턴됨
        // 여기까진 기존에 우리가 설정한 nickname 이름으로 데이터가 들어오지만 next auth 에서 지원하는 이름은 name이기 때문에,
        // 데이터를 받을 때 까진 nickname 으로 들어오지만 return 값에서 이름을 name으로 바꿔줌, email 도 마찬가지임, 나머지는 그대로 쓰겠다.
        // id를 email 이라는 키로 쓰는 이유는 nextauth에서 기본적으로 지정해둔 키값이 아니면 다 무시해버리기때문이다
        // console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
