import React, {useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css"
function App() {
  const [value, setValue] = useState("Input Text")

  return (
      <div className="App">
        <div className="post">
          <div className="post__content">
              <strong>1. Javascript</strong>
              <div>
                  Javascript - programming language
              </div>
              <div className="post__btns">
                  <button>Delete</button>
              </div>
          </div>
        </div>
      </div>
  );
}

export default App;
