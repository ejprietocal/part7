import { createSlice } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setLike(state, action){
            const id = action.payload.id
            const blogTochange = state.find(blog => blog.id === id)
            const blogChanged = {
                ...blogTochange,
                likes: blogTochange.likes + 1
            }
            return state.map(blog => blog.id === id ? blogChanged : blog)
        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        deleteBlogs(state, action){
            const id = action.payload.id
            return state.filter(blog => blog.id !== id)
        },
        setBlogs(state, action){
            return action.payload
        },
        setNewComments(state, action){
          const blogId = action.payload.id
          const blogTochange = state.find(blog => blog.id === blogId)
          const blogChanged = {
            ...blogTochange,
            comments: action.payload.comments
          }  
          return state.map(blog => blog.id === blogId ? blogChanged : blog)
        }
    }
})


export const { appendBlog , setBlogs, setLike, deleteBlogs, setNewComments } =  blogSlice.actions

const settingComments = (blog, comment) => {
    return async dispatch => {
        const blogUpdated = await BlogService.addComment(blog, comment)
        dispatch(setNewComments(blogUpdated))
    }
}

const initialBLogs  = () => {
    return async dispatch => {
        const blogs = await BlogService.getAll()
        dispatch(setBlogs(blogs))
    }
}


const deletedBlog = blog =>{
    return async dispatch => {
        const confirm = window.confirm(`you want to delete this: ${blog.title}?`)
        if(confirm){
            try{
                await BlogService.deleteBlog(blog.id)
                dispatch(deleteBlogs(blog))
            }
            catch(error){
                throw error
            }
        }
    }
}

const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await BlogService.createBlog(content)
        dispatch(appendBlog(newBlog))
    }
} 


const updatedBlog = content =>{
    return async dispatch => {
        const newBlog = await BlogService.updateBlog(content.id, {...content, likes: content.likes + 1})
        dispatch(setLike(newBlog))
    }
}

export {initialBLogs, createBlog, updatedBlog, deletedBlog, settingComments}
export default blogSlice.reducer
