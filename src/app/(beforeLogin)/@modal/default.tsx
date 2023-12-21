export default function Default() {
  return null;
}

// 해당 페이지의 필요성 ?
// (beforeLogin) > layout.tsx 에서 현재 {children} , {modal}을 받고 있는데,
// localhost:3000 일때의 children > page.tsx , modal은 @modal/page.tsx가 됨
// 근데 모달이 보여질 경로는 modal/i/flow/login 이므로 , @modal/page.tsx 에서 만들지 않고 하위 폴더를 만들어서 넣어줘야하는데,
// 이렇게 되면 layout 입장에서의 modal 이 없음. 그러므로 page.tsx 라고 만들어도 되지만, nextjs에서 명시적으로 default 라는 파일을 만들어서
// 대체할 내용이 필요하거나, 보여질 내용 없이 자리만 잡을 파일이 필요하면 사용할 수 있게 나와있음. 그래서 이거 쓴거.

// 그럼 이제 메인 페이지에선 모달이 뜨진 않을거임. 그냥 default.tsx로 만들어놨고 해당 페이지가 반환하는게 없기 때문에
// 화면에 뜨진 않게 됨. 하지만 분명 {modal} 을 통해 들어가고 있긴함
// 동시에 띄워줌으로 페러렐 라우팅의 역할은 끝남
