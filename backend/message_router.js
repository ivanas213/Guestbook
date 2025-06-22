const express = require('express');
const router = express.Router();
const messages = require("./enum/messages")
const tables = require("./enum/tables")
const fields = require("./enum/fields")
const db = require("./db");


// Adding new message to database 
router.post('/add', async (req, res) => {
    try {

        // Getting name and message from the body
        const { name, message } = req.body;

        // Validation input data and return status 400(Bad request) if the input is invalid
        if (!name || name.length === 0)
            return res.status(400).json({ error: messages.ERR_NAME_EMPTY })
        if (!message || message.length === 0)
            return res.status(400).json({ error: messages.ERR_MESSAGE_EMPTY })
        if(name.length > 50) 
            return res.status(400).json({ error: messages.ERR_NAME_TOO_LONG })
        if(message.length > 200)
            return res.status(400).json({ error: messages.ERR_MESSAGE_TOO_LONG})

        // Current date and time
        const createdAt = new Date()

        // Prepared statement
        const query = `INSERT INTO ${tables.Messages} (${fields.name}, ${fields.message}, ${fields.createdAt}) VALUES (?, ?, ?)`;
       
        //Executing prepared statement with params
        await db.execute(query, [name, message, createdAt]);

        // Sending status 201(created) with message 
        res.status(201).json({ message: messages.SUCC_ADDING_MESSAGE });
    } catch (error) {

        // Logging error
        console.log(error);

        // Sending status 500 with error message
        res.status(500).json(messages.INTERNAL_SERVER_ERROR + error);
    }
});

router.get("/", async (req,res) => {
    try {

        // Getting page from query, default 1 if not exists
        const page = parseInt(req.query.page) || 1;

        // Getting limit from query, default 10 if not exists
        const limit = parseInt(req.query.limit) || 10;

        // Defines how many rows to skip for pagination
        const offset = (page - 1) * limit;

        // Query (prepared statement with params for limit and offset not allowed)
        const query = `
            SELECT name, message, created 
            FROM messages 
            ORDER BY created DESC 
            LIMIT ${limit} OFFSET ${offset}
        `;
        
        // Result from query
        const [rows] = await db.execute(query);

        // Counting how many rows we have (to know if we have data for the next page)
        const [result] = await db.execute(`SELECT COUNT(*) AS count FROM messages`)

        // Checking if we have data for the next page
        const hasNext = result[0].count > offset + limit

        // Returning status 200(OK) and hasNext to know if we hvave next page
        res.status(200).json({
            messages: rows,
            hasNext: hasNext
        });
    } catch (error) {

        // Logging error
        console.log(error);

        // Sending status 500 with error message
        res.status(500).json(messages.INTERNAL_SERVER_ERROR + error);
    }
})

module.exports = router;