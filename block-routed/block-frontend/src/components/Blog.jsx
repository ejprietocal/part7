
import { Link } from 'react-router-dom'


const Blog = ({blog}) =>{


    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
        <div style={blogStyle}>
          <div className='text-3xl font-bold underline'>
            <Link to={`/blogs/${blog.id}`}>Title: {blog.title}</Link>
          </div>
        </div>  
      )

}


export default Blog