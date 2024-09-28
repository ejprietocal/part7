import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { updatedBlog, deletedBlog, settingComments } from "../reducers/blogReducer";
import { setNotification } from '../reducers/notificationReducer'
import Button from "./buttonDelete";
import { useField } from "../hooks";


const BlogDetails = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const match = useMatch('/blogs/:id')


    const content = useField('text')

    const blogs = useSelector(state => state.blogs)
    const users = useSelector(state=> state.users)


    const deleteBlog = (blog) => {
        try{
            dispatch(deletedBlog(blog))
            navigate('/')
        }catch(error){
            dispatch(setNotification('you are not allowed to delete it'))
        }
    }

    
    const blogMatched = blogs.find(blog => blog.id === match.params.id) 
    const userMatched = users.find(user => user.id === blogMatched.user.id)
    
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(settingComments(blogMatched, content.value))
        content.onChange({target: {value : ''}})
    }
    return(
        <>
            <h2>Blog App</h2>   
            <h2>{blogMatched.title}</h2>
            <p>likes: {blogMatched.likes} <button onClick={() => dispatch(updatedBlog(blogMatched))}>Like</button></p>
            <p>added by: {userMatched.name}</p>

            <Button onclick={()=> deleteBlog(blogMatched)} />
            {/* <button id={blogMatched.id} onClick={() => deleteBlog(blogMatched)}>Delete</button> */}

            <h3>comments</h3>

            <form onSubmit={handleSubmit}>
                <input {...content} />
                <button type='submit'>create</button>
            </form>

            <ul>
                {blogMatched.comments.map((blog, index) => (
                        <li key={index}>
                            {blog}
                        </li>
                ))}
            </ul>

        </>

    )


}



export default BlogDetails