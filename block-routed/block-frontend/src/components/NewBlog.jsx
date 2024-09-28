import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

import {
    useNavigate
} from 'react-router-dom'

const NewBlog = () =>{

    const disPatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.login)

    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0, comments: []})

    const addNewBlog = (event) =>{
        event.preventDefault()
        disPatch(createBlog(newBlog)) 
        disPatch(setNotification(`A new blog: ${newBlog.title} was created`))
        navigate('/') 
    }

    if(user.user){
        return (
            <form onSubmit={addNewBlog}>
                <div>
                    <label htmlFor="title">title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title"
                        data-testid="title"
                        onChange={({target}) =>setNewBlog({...newBlog, title: target.value})} 
                        value={newBlog.title} 
                    />
                </div>
                <div>
                    <label htmlFor="author">author:</label>
                    <input 
                        type="text" 
                        name="author" 
                        id="author"
                        data-testid="author"
                        onChange={({target}) => setNewBlog({ ...newBlog, author: target.value})} 
                        value={newBlog.author} 
                    />
                </div>
                <div>
                    <label htmlFor="url">url:</label>
                    <input 
                        type="text" 
                        name="url" id="url"
                        data-testid="url"
                        onChange={({target}) => setNewBlog({...newBlog, url: target.value})}
                        value={newBlog.url} 
                    />
                </div>
    
                <button type="submit" id='buttonSubmit'>Submit</button>
            </form>
        )
    }
    else{
        return(
            <h2>You need to log in first to create a new Blog</h2>
        )
    }
}

export default NewBlog