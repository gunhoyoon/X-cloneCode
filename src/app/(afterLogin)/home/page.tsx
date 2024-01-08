import React from "react";
import Post from "../_component/Post";
import styles from "./home.module.css";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Tab />
      <PostForm />
      <Post />
    </main>
  );
}
