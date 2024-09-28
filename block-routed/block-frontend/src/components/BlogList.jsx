import Blog from "./Blog"
import { useSelector } from 'react-redux';


const BlogList = () =>{

    const blogs = useSelector(state => state.blogs);

    const blogsSorted = [...blogs].sort((a,b)=>{
        return a.likes - b.likes
    })

    return (
        <>
            <h1>Blogs</h1>
            {blogsSorted.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
} 

export default BlogList