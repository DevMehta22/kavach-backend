const express = require("express")
const cors = require("cors")
const proxy = require("express-http-proxy")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/user",proxy("http://user-service:3000"))
app.use("/civilian",proxy("http://civilian-service:3001"))
app.use("/officer",proxy("http://officer-service:3002"))
app.use("/incident",proxy("http://incident-service:3003"))
app.use("/sos",proxy("http://sos-service:3004"))
app.use("/case",proxy("http://case-service:3005"))

const port = 8000;

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
    })
