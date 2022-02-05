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
function App() {
  const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: "", query:""})
    const [visible, setVisible] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [isPostsLoading, setIsPostsLoading] = useState(false)

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
    async function fetchPosts()
    {
        setIsPostsLoading(true);
        setTimeout(async ()=>{
            const posts = await PostService.getAll();
            setPosts(posts)
            setIsPostsLoading(false);
        }, 1000)

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
          {isPostsLoading
            ?<div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
                  <Loader/>
              </div>
            :<PostList remove={removePost} posts={sortedAndSearchedPosts} title="JS Posts"/>
          }
          {/*<PostList remove={removePost} posts={posts} title="Javascript Posts"/>*/}
      </div>
  );
}

export default App;
