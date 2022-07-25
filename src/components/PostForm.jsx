import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import PostService from '../API/PostService';

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: "", body: ""})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost ={
            userId: 1,
            
             ...post
        }
        create(newPost)
        setPost({title: "", body: ""})
    }

    return (
        <div>
            <form>
                <MyInput
                    value={post.title}
                    onChange={e=>setPost({...post, title: e.target.value})}
                    type="text"
                    placeholder="Posts Name"/>
                <MyInput
                    value={post.body}
                    onChange={e=>setPost({...post, body: e.target.value})}
                    type="text"
                    placeholder="Posts Description"
                />
                <MyButton onClick={addNewPost}>Add Post</MyButton>
            </form>
        </div>
    );
};

export default PostForm;