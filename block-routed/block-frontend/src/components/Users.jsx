import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Users = () => {

    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    const style = {
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '0px',
        textAlign: 'center'
    }

    return(
        <>
            <h1>Users</h1>

            <table>
                <thead>
                    <tr>
                        <th>User name</th>
                        <th>Created Blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>(
                        <tr style={style} key={user.id}>
                            <td>
                                <p><Link to={`/users/${user.id}`} >{user.name}</Link></p>
                            </td>
                            <td>
                                {blogs.reduce( (sum, order) => {
                                    return order.user.id === user.id ? sum + 1 : 0
                                },0)}
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

            <ul>
            </ul>
        </>
    )
}

export default Users