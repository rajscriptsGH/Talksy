import express from 'express'
import 'dotenv/config'

import authRouters from "./routes/auth.route.js"
import { connectDB } from './lib/db.js'

const app = express()
const PORT = process.env.PORT


app.use(express.json())

app.use('/api/auth', authRouters)



app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
    connectDB()
})