import style from "./search.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "./_component/Tab";
import SearchResult from "./_component/SearchResult";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export async function generateMetadata({ searchParams }: Props) {
  return {
    title: `${searchParams.q} 검색 / Z`,
    description: `${searchParams.q} 검색 / Z`,
  };
}
// 동적 메타데이터
//
export default function Search({ searchParams }: Props) {
  console.log(searchParams, "searchParams");
  // searchParams = { q: '제로초', f: 'live', pf: 'on' }  와 같은 구조를 가지고 있음, 현재url의 쿼리스트링에 접근가능
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
        {/* search 컴포넌트에서 q , f , pf 의 값을 다 받고 있기 때문에 쿼리 스트링 값을 넘겨주는 것도 가능함 */}
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}
