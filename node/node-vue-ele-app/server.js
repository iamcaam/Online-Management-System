const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// 引入 users.js
const users = require("./routes/api/users");

// 使用body-parser中間件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Hello World!!");
})

// 使用routes
app.use("/api/users", users);

const port  = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running op port ${port}`)
});
