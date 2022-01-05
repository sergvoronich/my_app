import React, { useMemo, useState } from "react";
import { useRef } from "react";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import "./styles/App.css";

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'aaa', body: 'ggggggg' },
    { id: 2, title: 'sss', body: 'kkkkkkk' },
    { id: 3, title: 'bbb', body: 'aaaaaaa' },
  ])

  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const sortedPosts = useMemo(() => {
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts
  }, [selectedSort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery))
  }, [searchQuery, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = sort => {
    setSelectedSort(sort)
  }

  return (
    <div className="App" >
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MyInput
          placeholder='Поиск...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue='Сортировка по'
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" }]}
        />
      </div>
      {sortedAndSearchedPosts.length !== 0
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
        : <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>
      }

    </div >
  )
}

export default App;
