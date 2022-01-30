import React, {useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css"
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: "Javascript", body: "Description"},
      {id: 2, title: "Javascript1", body: "Description"},
      {id: 3, title: "Javascript2", body: "Description"},
  ])
  const [posts2, setPosts2] = useState([
      {id: 1, title: "Python", body: "Description"},
      {id: 2, title: "Python1", body: "Description"},
      {id: 3, title: "Python2", body: "Description"},
  ])

  return (
      <div className="App">
        <PostList posts={posts} title="Javascript Posts"/>
        <PostList posts={posts2} title="Python Posts"/>
      </div>
  );
}

export default App;
