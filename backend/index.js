const cors = require("cors")
const express = require("express")
const messageRouter = require("./message_router")
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())
const router = express.Router();
app.use(router)
router.use('/message', messageRouter)
app.listen(3001, ()=>{
    console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT} !`)
})