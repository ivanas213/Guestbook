import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {Errors} from '../constants/errors'
import {Status} from '../constants/status'

function NewMessage(){
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("")
    const [sending, setSending] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSubmit = (async (e)=>{
        e.preventDefault()
        // if(message === null || message.length === 0) {
        //     setError(Errors.EMPTY_MESSAGE)
        //     return
        // }
        // else if(name === null || name.length === 0) {
        //     setError(Errors.EMPTY_NAME)
        //     return 
        // }
        setError("")
        setSending(true)
        setStatus(Status.SENDING)

        try{
            const res = await fetch("http://localhost:3001/message/add", {
                method: "POST",
                body: JSON.stringify({message, name}),
                headers:  { "Content-Type": "application/json" }
            })
            if(res.ok){
                setStatus(Status.SUCCESSFUL)
                setTimeout(() => navigate("/"), 1000)
            }
            else{
                const err = await res.json()
                setStatus(Status.FAILED+err.error)
            }
        }
        catch(err){
            setStatus(Status.FAILED + (err?.error || Errors.NETWORK_ERROR))
        }

    })

    return(<div>
        <p>Leave a message:</p>
        <form onSubmit={handleSubmit}>
            <label>Your name: </label>
            <input value={name} disabled={sending} onChange={e=>setName(e.target.value)} ></input>
            <br/>
            <label>Message: </label>
            <input value={message} disabled={sending} onChange={e=>setMessage(e.target.value)} ></input>
            <br/>
            <button disabled = {sending} type="submit" > Submit </button>
        </form>
        <p>{status}</p>
        <p className="error">{error}</p>

    </div>)
}
export default NewMessage

