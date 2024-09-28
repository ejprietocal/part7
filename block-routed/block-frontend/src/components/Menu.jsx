import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { eraseLogin } from "../reducers/loginReducer"



const Menu = () =>{

    const dispatch = useDispatch()
    const user = useSelector(state => state.login.user)

    const style = {
        padding: 10
    }

    return(
        <>
            <Link style={style} to="/">Home</Link>
            <Link style={style} to="/users">Users</Link>
            <Link style={style} to="/create">Create</Link>
            {
                user ? <span>{user} logged <button onClick={()=> dispatch(eraseLogin()) }>Log out</button></span> : <Link style={style} to="/login">Log in</Link>
            }
        
        </>
    )
}

export default Menu