const express = require('express');
const router = express.Router();
const messages = require("./enum/messages")
const tables = require("./enum/tables")
const fields = require("./enum/fields")
const db = require("./db");

router.post('/add', async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || name.length === 0)
            return res.status(400).json({ error: messages.ERR_NAME_EMPTY });
        if (!message || message.length === 0)
            return res.status(400).json({ error: messages.ERR_MESSAGE_EMPTY });

        const createdAt = new Date()

        const query = `INSERT INTO ${tables.Messages} (${fields.name}, ${fields.message}, ${fields.createdAt}) VALUES (?, ?, ?)`;
        console.log(query);
        await db.execute(query, [name, message, createdAt]);

        res.status(201).json({ message: messages.SUCC_ADDING_MESSAGE });
    } catch (error) {
        console.log(error);
        res.status(500).send(messages.INTERNAL_SERVER_ERROR + error);
    }
});




module.exports = router;