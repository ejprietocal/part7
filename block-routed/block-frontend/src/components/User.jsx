import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const User =  () => {
    const match = useMatch('/users/:id')

    const users = useSelector(state => state.users)
    const user = users.find(user => user.id === match.params.id)

    const blogs = useSelector(state => state.blogs)
    const blogsMatched = blogs.filter(blog => blog.user.id === match.params.id) 

    const style = {
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '0px'
    }

    if(blogsMatched.length  !== 0){
        return(
            <>
                <h1>User</h1>

                <p>{user.name}</p>

                <h2>added Blogs</h2>
                <ul>
                    {
                        blogsMatched.map(blog => (
                            <li style={style} key={blog.id}>{blog.title}</li>
                        ))
                    }
                </ul>
            </>
        )
    }

    return(
        <>
            <h1>User</h1>

            <p>{user.name}</p>

            <h2>added Blogs</h2>
            <h1>No blogs added</h1>
        </>
    )

}

export default User