import axios from "axios";

export default class PostService {
    static async getAll(limit=10, page=1) {
        const response = await axios.get('http://localhost:5000/posts/', {
                params:{
                    _limit: limit,
                    _page: page,
                },
            })
            console.log(response)
        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:5000/posts/' + id)
        return response
    }

    static async getCommentsByPostId(id){
        const response = await axios.get(`http://localhost:5000/posts/${id}/comments`)
        return response
    }

    static async createPost(post){
        let response;
        await axios.post(`http://localhost:5000/posts`, {...post}).then((r)=>response=r).catch((err)=>console.log(err))
        return response
    }

    static async deletePost(id){
        const response = await  axios.delete(`http://localhost:5000/posts/${id}`)
        return response
    }

    // static async getAll(limit=10, page=1) {
    //     const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    //             params:{
    //                 _limit: limit,
    //                 _page: page
    //             }
    //         })
    //         console.log(response)
    //     return response
    // }
    //
    // static async getById(id) {
    //     const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
    //     return response
    // }
    //
    // static async getCommentsByPostId(id){
    //     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    //     return response
    // }
    //
    // static createPost(post){}
    //
    // static async deletePost(id){}
}