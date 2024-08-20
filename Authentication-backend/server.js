import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import authroutes from "./Routes/AuthRoute.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/v1/auth", authroutes)


app.listen(3000, ()=>{
    console.log("Server is running on 3000")
})