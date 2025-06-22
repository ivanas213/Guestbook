import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home(){
    const [messages, setMessages] = useState([])
    useEffect(()=>{
        fetch("http://localhost:3001/message/").then((res)=>res.json()).then((data)=>setMessages(data.messages)).catch((err)=> console.log("Error "+err))
    })
    return(<div>
        <h1>Guestbook</h1>
        <p>See all messages and feel free to write your message.</p>
        {
            messages.map((mess, ind)=>(
            <div key = {ind}>
                <p>{mess.message}</p>
                <small>{mess.name} {new Date(mess.created).toLocaleDateString()}</small>
            </div>

            )
            )
        }
        <Link to = "/add"><button>Add message</button></Link>
    </div>)
}
export default Home