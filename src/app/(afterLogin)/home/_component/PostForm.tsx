"use client";

import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import style from "./postForm.module.css";
import { Session } from "@auth/core/types";
import TextareaAutosize from "react-textarea-autosize";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Post } from "@/model/Post";

type Props = {
  me: Session | null;
};

export default function PostForm({ me }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);

  const queryClient = useQueryClient();
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };
  const hasPostsRecommends = queryClient.getQueryData(["posts", "recommends"]);
  const hasPostsFollowings = queryClient.getQueryData(["posts", "followings"]);
  // 요청 보내기
  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("content", content);
      preview.forEach((p) => {
        p && formData.append("images", p.file);
      });
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: "post",
        credentials: "include",
        body: formData,
      });
    },
    // 성공했을 때
    // response -> fetch에 대한 데이터
    // variable -> 처음 formdata
    async onSuccess(response, variable) {
      const newPost = await response.json();
      // 추가한 포스트 데이터 가져옴
      setContent("");
      setPreview([]);
      // 초기화
      if (hasPostsRecommends) {
        // posts, recommends에 관한 데이터가 있을 때
        ``;
        queryClient.setQueryData(
          ["posts", "recommends"],
          (prevData: { pages: Post[][] }) => {
            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };
            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);
            return shallow;
          }
        );
      }
      if (hasPostsFollowings) {
        queryClient.setQueryData(
          ["posts", "followings"],
          (prevData: { pages: Post[][] }) => {
            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };
            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);
            return shallow;
          }
        );
      }
    },
    // 실패
    onError(error) {
      console.error(error);
      alert("업로드 중 에러가 발생했습니다.");
    },
  });

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    // 파일 인풋에 연결된 인풋이고, 사용자가 파일을 선택했을 때, e.target.files 로 파일에 대한 데이터가 들어옴

    e.preventDefault();
    if (e.target.files) {
      // 해당 파일 데이터를 배열로 만들어주고 forEach로 하나씩 순회함
      Array.from(e.target.files).forEach((file, index) => {
        //파일을 읽을 수 있는 FileReader 인스턴스 생성
        const reader = new FileReader();
        // const a = { f: null };
        // if (typeof a.f === "function") {
        //   a.f();
        // }
        // reader.readASDataURL 에서 파일 읽기가 끝나면, reader.onloadend 실행
        reader.onloadend = () => {
          // setState 업데이트. prevPreview는 현재 파일 데이터(이전값)
          setPreview((prevPreview) => {
            const prev = [...prevPreview];
            // 불변성 위해서 얕은 복사
            prev[index] = {
              dataUrl: reader.result as string,
              file,
            };

            // 다 읽고 난 다음 prev 배열의 해당 인덱스에 데이터 넣어줌
            return prev;
            // 반환
          });
        };

        reader.readAsDataURL(file);
        // reader.readAsDataURL 로 파일 데이터
      });
    }
  };

  const onRemoveImage = (index: number) => () => {
    // preview 가 가지고 있는 파일들의 인덱스를 인자로 받아서
    setPreview((prevPreview) => {
      const prev = [...prevPreview];
      // 이전값(현재) 복사하고
      prev[index] = null;
      // 인덱스 찾아서 비워둠
      return prev;
      // 반환
    });
  };

  // const form = new FormData();
  // console.log("form", form);
  // form.append("키1", "벨류1");
  // form.append("키2", "벨류2");
  // form.append("키3", "벨류3");
  // console.log("form", form);
  // for (let [key, value] of form.entries()) {
  //   console.log(value);
  // }

  // console.log("preview", preview);
  return (
    <form className={style.postForm} onSubmit={mutation.mutate}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img
            src={me?.user?.image as string}
            alt={me?.user?.email as string}
          />
        </div>
      </div>
      <div className={style.postInputSection}>
        <TextareaAutosize
          value={content}
          onChange={onChange}
          placeholder="무슨 일이 일어나고 있나요?"
        />
        <div style={{ display: "flex" }}>
          {preview.map(
            (v, index) =>
              v && (
                <div
                  key={index}
                  style={{ flex: 1 }}
                  onClick={onRemoveImage(index)}
                >
                  <img
                    src={v.dataUrl}
                    alt="미리보기"
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      maxHeight: 100,
                    }}
                  />
                </div>
              )
          )}
        </div>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input
                type="file"
                name="imageFiles"
                multiple
                hidden
                ref={imageRef}
                onChange={onUpload}
              />
              <button
                className={style.uploadButton}
                type="button"
                onClick={onClickButton}
              >
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>
              게시하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

{
  /* 사  진등록 버튼 이미지 */
}
{
  /* 버튼의 Ul가 될 이미지고, 버튼엔 ref.current.click() 이 연결되어있음 */
}
{
  /* click() 은 DOM API 로 클릭한거처럼 동작하게 된다. */
}
