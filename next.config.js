/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/upload/:slug",
        destination: "http://localhost:9090/upload/:slug",
      },
    ];
  },
};

module.exports = nextConfig;
// 이미지는 뭐가 들어올지 모르기 때문에 동적으로 들어올거고 (:slug)
// upload 뭐 이런식으로 들어와서 제대로 이미지가 안보여지기 때문에, http://localhost:9090 으로 백엔드 주소 입력
