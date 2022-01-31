import React, {useRef, useState} from "react";
import "./styles/App.css"
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: "aaa", body: "bbb"},
      {id: 2, title: "ccc", body: "aaa"},
      {id: 3, title: "bbb", body: "ccc"},
  ])
    const [selectedSort, setSelectedSort] = useState("")
    const createPost = (newPost) => {
      setPosts([...posts, newPost])
    }
    const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
    }
    const sortPosts = (sort) => {
      setSelectedSort(sort)
      setPosts([...posts].sort((a,b) => a[sort].localeCompare(b[sort])))
    }

  return (
      <div className="App">
        <PostForm create={createPost}/>
          <hr style={{margin:"15px 0"}}/>
          <div>
              <MySelect
                  value={selectedSort}
                  onChange={sortPosts}
                  defaultValue="Sort"
                  option={[
                      {value: "title", name: "By Title"},
                      {value: "body", name: "By Description"},
                  ]}
              />
          </div>
          {posts.length
            ? <PostList remove={removePost} posts={posts} title="JS Posts"/>
            : <h1 style={{textAlign: "center"}}>Post Not Found</h1>
          }
        {/*<PostList remove={removePost} posts={posts} title="Javascript Posts"/>*/}
      </div>
  );
}

export default App;
