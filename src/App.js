import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import PostService from "./API/PostService";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import Loader from "./components/UI/Loader/Loader";
import MyModal from "./components/UI/MyModal/MyModal";
import MySelect from "./components/UI/select/MySelect";
import { usePosts } from "./hooks/usePosts";
import "./styles/App.css";

function App() {

  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [isPostLoading, setIsPostLoading] = useState(false)

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  async function fetchPosts() {
    setIsPostLoading(true)
    const posts = await PostService.getAll()
    setPosts(posts)
    setIsPostLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [filter])

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className="App" >
      <MyButton
        style={{ marginTop: "30px" }}
        onClick={() => setModal(true)}
      >Создать пользователя</MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {isPostLoading
        ? <div className='loader-container'><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
      }
    </div >
  )
}

export default App;
