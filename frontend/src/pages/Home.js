import { STEP_STATE } from "@angular/cdk/stepper"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
function Home(){
    const [messages, setMessages] = useState([])
    const [page, setPage ] = useState(1)
    const [hasNext, setHasNext] = useState(false)
    useEffect(()=>{
        fetch(`http://localhost:3001/message/?page=${page}&limit=10`).then((res)=>res.json()).then((data)=>{setMessages(data.messages);setHasNext(data.hasNext)}).catch((err)=> console.log("Error "+err), [page])
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
        <button onClick = {() => setPage((page) => page - 1)} disabled = {page === 1}>Previous</button>
        <button onClick={() => setPage((page) => page + 1)} disabled ={!hasNext}>Next</button>
        <Link to = "/add"><button>Add message</button></Link>
    </div>)
}
export default Home