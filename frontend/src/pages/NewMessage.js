import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function NewMessage(){
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("")
    const [sending, setSending] = useState(false)
    const handleSubmit = (async (e)=>{
        e.preventDefault()
        setStatus("Sending...")
        setSending(true)
        try{
            const res = await fetch("http://localhost:3001/message/add", {
                method: "POST",
                body: JSON.stringify({message, name}),
                headers:  { "Content-Type": "application/json" }
            })
            if(res.ok){
                setStatus("Succes!")
                setTimeout(() => navigate("/"), 3000)
            }
            else{
                const err = await res.json()
                setStatus("Failed: "+err.message)
            }
        }
        catch(err){
            setStatus("Failed: "+err.message)
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
    </div>)
}
export default NewMessage

