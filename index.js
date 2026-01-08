const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let messages = [];

app.post("/send", (req, res) => {
    const { user, message } = req.body;
    if (!user || !message) return res.sendStatus(400);

    messages.push({
        user,
        message,
        time: Date.now()
    });

    if (messages.length > 50) messages.shift();

    res.sendStatus(200);
});

app.get("/get", (req, res) => {
    res.json(messages);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Chat server running");
});
