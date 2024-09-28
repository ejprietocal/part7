import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogin } from "../reducers/loginReducer"
import { useNavigate } from "react-router-dom"
import loginService from  '../services/login'
import blogService from '../services/blogs'
import { setNotification } from "../reducers/notificationReducer"

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialCredentials = useSelector(state => state.login)


    const [user, setUser] = useState({user: '', password: ''})

    const handleLogin = async () => {
        try {
            const usuario = await loginService.login({
                username: user.user, password: user.password,
            })
            
            window.localStorage.setItem(
                'loggeBlogAppUser', JSON.stringify(usuario)
            )
            blogService.setToken(usuario.token)
            dispatch(setLogin(usuario))
            navigate('/')
        } catch (exception) {
            console.error("Error durante el inicio de sesión:", exception);

          dispatch(setNotification('User or password incorrect')) 
          setUser({user: '', password: ''}) 
        }
      }
    

    const loginIn = (event) =>{
        event.preventDefault()
        handleLogin()
    }
    
    if(initialCredentials.user){
        return(
            <h2>{initialCredentials.user} is already logged </h2>
        ) 
    }

    return (
        <form onSubmit={loginIn}>
            <div className="field">
                <input 
                    type="text" 
                    name="Username" 
                    placeholder="username" 
                    onChange={({target})  => setUser({...user, user: target.value})}
                    value={user.user}
                    data-testid="username"
                />
            </div>
            <div className="field">
                <input 
                    type="password" 
                    name="Password" 
                    placeholder="password" 
                    onChange={({target})  => setUser({...user, password: target.value})}
                    value={user.password} 
                    data-testid="password"
                />
            </div>
            <button>login</button>
        </form>
    )
}

export default Login