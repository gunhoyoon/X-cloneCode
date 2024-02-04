import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}
const User = [
  { id: "elonmusk", nickname: "Elon Musk", image: "/yRsRRjGO.jpg" },
  { id: "gunho", nickname: "윤건호", image: "/5Udwvqim.jpg" },
  { id: "leoturtle", nickname: "레오", image: faker.image.avatar() },
];
const Posts = [];
const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const handlers = [
  http.post("/api/login", () => {
    console.log("로그인");
    return HttpResponse.json(
      {
        userId: 1,
        nickname: "윤건호",
        id: "YunGunHo",
        image: "/5Udwvqim.jpg",
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      }
    );
  }),
  http.post("/api/logout", () => {
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  // http.post('/api/users', async (
  //     console.log("회원가입");
  //     return HttpResponse.text(JSON.stringify('user_exists'), {
  //       status: 403,
  //     })
  //   ))
  http.post("/api/users", async ({ request }) => {
    console.log("회원가입");
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
  http.get("/api/postRecommends", async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get("/api/followingPosts", async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} Stop following me. I' m too famous.`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} Stop following me. I' m too famous.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} Stop following me. I' m too famous.`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} Stop following me. I' m too famous.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} Stop following me. I' m too famous.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  // :tag의 경우 url 파라미터로 언제든 바뀔 수 있는 값임

  http.get("/api/search/:tag", async ({ request, params }) => {
    // /api/search/:tag의 부분이, getSearchResult에서 /api/search/${searchParams.q}의 부분이 params로 들어오게 됨
    const { tag } = params;
    //지금 :tag이기때문에 params.tag 로 접근하는거임, :tag의 값이  params: {tag : 여기로 들어옴};
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} 검색결과 ${tag}`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} 검색결과 ${tag}`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} 검색결과 ${tag}`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} 검색결과 ${tag}`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} 검색결과 ${tag}`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get("/api/users/:userId", ({ request, params }) => {
    // 특정 사용자의 관한
    const { userId } = params;
    const found = User.find((v) => v.id === userId);
    if (found) {
      return HttpResponse.json(found);
    }
    return HttpResponse.json(
      { message: "no_such_user" },
      {
        status: 404,
      }
    );
  }),
  http.get("/api/users/:userId/posts", async ({ request, params }) => {
    const { userId } = params;
    // 전달받을만한건 userId 정도, params로 전달받아서 사용
    // 특정 사용자의 게시글 + 내 글도 될 수 있음. 쉽게 말해 어떤 유저의 아이디는 전부 다이나믹하게 처리 답글도 마찬가지
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} ${userId} 의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} ${userId} 의 게시글`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} ${userId} 의 게시글`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} ${userId} 의 게시글`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} ${userId} 의 게시글`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get(
    "/api/users/:userId/posts/:postId/comments",
    async ({ request, params }) => {
      const { userId, postId } = params;

      await delay(3000);
      const url = new URL(request.url);
      const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
      return HttpResponse.json([
        {
          postId: 1,
          User: User[0],
          content: `${1} ${userId} 의 게시글 ${postId}의 답글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[0],
          content: `${2} ${userId} 의 게시글 ${postId}의 답글`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[0],
          content: `${3} ${userId} 의 게시글 ${postId}의 답글`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[0],
          content: `${4} ${userId} 의 게시글 ${postId}의 답글`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
            { imageId: 3, link: faker.image.urlLoremFlickr() },
            { imageId: 4, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[0],
          content: `${5} ${userId} 의 게시글 ${postId}의 답글`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
            { imageId: 3, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
      ]);
    }
  ),
  http.get("/api/followRecommends", ({ request }) => {
    return HttpResponse.json(User);
  }),
  http.get("/api/trends", ({ request }) => {
    return HttpResponse.json([
      { tagId: 1, title: "제로초", count: 1264 },
      { tagId: 2, title: "원초", count: 1264 },
      { tagId: 3, title: "투초", count: 1264 },
      { tagId: 4, title: "쓰리초", count: 1264 },
      { tagId: 5, title: "포초", count: 1264 },
      { tagId: 6, title: "파이브초", count: 1264 },
      { tagId: 7, title: "식스초", count: 1264 },
      { tagId: 8, title: "세븐초", count: 1264 },
      { tagId: 9, title: "나인초", count: 1264 },
    ]);
  }),
];
