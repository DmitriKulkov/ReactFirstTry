import React, {useEffect, useRef, useState} from "react";
import "../styles/App.css"
import PostService from "../API/PostService";
import {getPagesCount} from "../components/utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
import { useTranslation } from "react-i18next";

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: "", query:""})
    const [visible, setVisible] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const {t, i18n} = useTranslation()



    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page)=> {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })


    useObserver(lastElement, page < totalPages, isPostsLoading, ()=>{
        setPage(page + 1)
				console.log(page)
    })
    
    useEffect(()=> {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        PostService.createPost(newPost).then((r)=>page===totalPages?setPosts([...posts, r.data]):null)

        setVisible(false)
    }
    const removePost = (post) => {
        PostService.deletePost(post.id)
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            {/* <button onClick={fetchPosts}>Get Posts</button> */}
            <MyButton style={{marginTop: 30}} onClick={()=>setVisible(true)}>
                {t("posts.create")}
            </MyButton>
            <MyModal visible={visible} setVisible={setVisible}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin:"15px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={t("posts.posts_number")}
                options={[
                    {value: 5, name: "5"},
                    {value: 10, name: "10"},
                    {value: 25, name: "25"},
                    {value: -1, name: "All"},
                ]}
            />
            {postError &&
                <h1 style={{textAlign: "center"}}>{t("posts.error")} ${postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={t("posts.title_js")}/>
            <div ref={lastElement} style={{height: 20}}/>
            {isPostsLoading &&
                < div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
                    <Loader/>
                </div>
            }
            {/* <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            /> */}
        </div>
    );
}

export default Posts;