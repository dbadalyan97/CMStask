const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth')
const cors = require("cors")
const app = express()
const testAPIRouter = require("./routes/testAPI");

mongoose.connect('mongodb+srv://mihran:2001@cluster0.ulrw3.mongodb.net/JWTLoginRegister?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})


app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use("/testAPI", testAPIRouter)
app.use(cookieParser())
//app.use(dotenv())

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log('Server is running on port 9000')
})

app.use('/', authRoute)

module.exports = app;


