const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.write("Hello world");
    console.log("Hello world");
    res.end();
});

app.listen(port);