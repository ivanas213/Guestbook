import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {Errors} from '../constants/errors'
import { Messages } from "../constants/messages"
import {Titles} from "../constants/titles"


// Showing messages
function Home(){
    const [messages, setMessages] = useState([]) // all messages
    const [page, setPage ] = useState(1) // current page
    const [hasNext, setHasNext] = useState(false) // have or not have more pages
    const [error, setError] = useState("") // errors

    // Fetches messages from the server whenever the page value changes
    // On success, updates the list of messages and whether there is a next page
    // On failure, sets an appropriate error message
    useEffect(()=>{
        fetch(`http://localhost:3001/message/?page=${page}&limit=10`).then((res)=>res.json()).then((data)=>{setMessages(data.messages);setHasNext(data.hasNext);setError("")}).catch((err)=> {
            console.log("Error "+err)
            setError(Errors.LOADING_FAILED)
        })
    }, [page])
    return(<div>
        {/* Page title */}
        <h1 className="title">{Titles.GUESTBOOK}</h1>
        {/* Text for showing messages */}
        <p>{Messages.SHOWING_MESSAGES}</p>
        {
            messages.map((mess, ind)=>(
            <div key = {mess.id}>
                {/* Display name and formated date */}
                <p>{mess.message}</p>
                <small>{mess.name} {new Date(mess.created).toLocaleString()}</small>
            </div>
            )
            )
        }
        {/* Previous page, disabled when we are on first page */}
        <button onClick = {() => setPage((page) => page - 1)} disabled = {page === 1}>Previous</button> 
        
        {/*Next page, disabled when no more data */}
        <button onClick={() => setPage((page) => page + 1)} disabled ={!hasNext}>Next</button>

        {/* Link to adding new message */}
        <Link to = "/add"><button>Add message</button></Link> 

        {/*Error */}
        <p className="error">{error}</p>

    </div>)
}
export default Home