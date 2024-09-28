import { useSelector } from "react-redux"

const Notification = () =>{ 
    const notification = useSelector(state => state.notification)

    const style = {
        border: notification.border,
        borderWidth: notification.borderWidth
    }

    return (
        <h3 style={style}>{notification.content}</h3>
    )
}


export default Notification