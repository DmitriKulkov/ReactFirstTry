import React, {useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css"
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: "Javascript", body: "Description"},
      {id: 2, title: "Javascript1", body: "Description"},
      {id: 3, title: "Javascript2", body: "Description"},
  ])
    const [title, setTitle] = useState("")
    const addNewPost = (e) => {
        e.preventDefault()
    }


  return (
      <div className="App">
          <form>
              <MyInput
                  value={title}
                  onChange={e=>setTitle(e.target.value)}
                  type="text"
                  placeholder="Posts Name"/>
              <MyInput type="text" placeholder="Posts Description"/>
              <MyButton onClick={addNewPost}>Add Post</MyButton>
          </form>
        <PostList posts={posts} title="Javascript Posts"/>
      </div>
  );
}

export default App;
