import React from "react";
import Post from "../_component/Post";
import styles from "./home.module.css";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </TabProvider>
    </main>
  );
}

// 현재 탭의 상태에 따라 포스트들이 바뀐다.
// 그 말은 탭의 상태를 포스트 관련 컴포넌트들은 알고 있어야한다는 것이다.
