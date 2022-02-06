import React, {useEffect, useMemo, useRef, useState} from "react";
import "./styles/App.css"
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostItem from "./components/PostItem";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";
import {getPagesCount} from "./components/utils/pages";
import {usePagination} from "./hooks/usePagination"
function App() {
  const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: "", query:""})
    const [visible, setVisible] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const pagesArray = usePagination(totalPages)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async ()=> {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })

    useEffect(()=> {
        fetchPosts()
    }, [])

    const createPost = (newPost) => {
      setPosts([...posts, newPost])
        setVisible(false)
    }
    const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts()
    }

  return (
      <div className="App">
          <button onClick={fetchPosts}>Get Posts</button>
          <MyButton style={{marginTop: 30}} onClick={()=>setVisible(true)}>
              Create Post
          </MyButton>
          <MyModal visible={visible} setVisible={setVisible}>
              <PostForm create={createPost}/>
          </MyModal>
          <hr style={{margin:"15px 0"}}/>
          <PostFilter
              filter={filter}
              setFilter={setFilter}
          />
          {postError &&
          <h1 style={{textAlign: "center"}}>Error: ${postError}</h1>}
          {isPostsLoading
            ?<div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
                  <Loader/>
              </div>
            :<PostList remove={removePost} posts={sortedAndSearchedPosts} title="JS Posts"/>
          }
          <div className={"page__wrapper"}>
              {pagesArray.map(p=>
                  <span
                      key={p}
                      onClick={()=>changePage(p)}
                      className={
                      page === p
                          ? "page page__current"
                          : "page"
                  }>{p}</span>)
              }
          </div>
      </div>
  );
}

export default App;
