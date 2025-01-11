const express = require("express")
const cors = require("cors")
const proxy = require("express-http-proxy")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/user",proxy("http://localhost:3000"))
app.use("/civilian",proxy("http://localhost:3001"))
app.use("/officer",proxy("http://localhost:3002"))
app.use("/incident",proxy("http://localhost:3003"))
app.use("/sos",proxy("http://localhost:3004"))
app.use("/case",proxy("http://localhost:3005"))

const port = 8000;

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
    })
