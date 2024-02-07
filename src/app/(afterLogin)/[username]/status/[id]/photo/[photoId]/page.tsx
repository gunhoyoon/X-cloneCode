import HomePage from "@/app/(afterLogin)/home/page";

type Props = {
  params: { username: string; id: string; photoId: string };
};
// 페이지에서 받아올 수 있는 2가지 , params, searchParams가 있음,

// params는 [username] 과 같은 슬러그의 값을 받아올 수 있는거임

// searchParams 는 쿼리스트링의 값을 받아올 수 있는거임. searchParams.q , searchParams.id 등등 으로 값을 받아올 수 있음

// 해당 슬러그의 값을 받아오기 위해서 params 사용

export default function page({ params }: Props) {
  return <HomePage />;
}
// ㅎ ㅏ... 이거 before/home 컴포넌트로 임포트했다가 자꾸 리다이렉션돼서 개빡쳣네 ...
// 결국 상세 페이지도 모달임,
// 이미지를 클릭하면 뒤에 글이 나오는 배경이 그대로 깔려있고, 페러렐 + 인터셉팅 할건데,
// 경로가 [username] -> status -> [id] -> photo -> [photoId] 로 이루어짐
