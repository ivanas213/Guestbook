import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {Errors} from '../constants/errors'
import {Status} from '../constants/status'

// Entering new message
function NewMessage(){

    // State variables
    const navigate = useNavigate() // Navigate between pages
    const [name, setName] = useState("") // Name
    const [message, setMessage] = useState("") // Message
    const [status, setStatus] = useState("") // Status
    const [sending, setSending] = useState(false) // Sending?
    const [error, setError] = useState("") // Error
    const handleSubmit = (async (e)=>{

        e.preventDefault() // Prevent page reload
        setError("") // Clear old error
        setSending(true) // Set sending to disable form inputs 
        setStatus(Status.SENDING) // Set sending status

        try{
            // Sending post request to backend
            const res = await fetch("http://localhost:3001/message/add", {
                method: "POST",
                body: JSON.stringify({message, name}),
                headers:  { "Content-Type": "application/json" }
            })
            if(res.ok){
                setStatus(Status.SUCCESSFUL) // Successful
                setTimeout(() => navigate("/"), 1000) // Redirect to home page after 1 second
            }
            else{
                const err = await res.json()
                setStatus(Status.FAILED) // Failed
                setError((err?.error || Errors.NETWORK_ERROR)) // Setting error
            }
        }
        catch(err){
            setStatus(Status.FAILED) // Failed
            setError((err?.error || Errors.NETWORK_ERROR)) // Setting error
        }

    })

    return(<div>
        <p>Leave a message:</p>
        <form onSubmit={handleSubmit}>
            <label>Your name: </label>
            <input value={name} disabled={sending} onChange={e=>setName(e.target.value)} ></input>
            <br/>
            <label>Message: </label>
            <textarea value={message} disabled={sending} onChange={e=>setMessage(e.target.value)} ></textarea>
            <br/>
            <button disabled = {sending} type="submit" > Submit </button>
        </form>
        <p>{status}</p>
        <p className="error">{error}</p>

    </div>)
}
export default NewMessage

