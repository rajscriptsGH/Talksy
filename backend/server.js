import express from 'express'

const app = express()
const port = 3000

app.get("/api/auth/signup", (req, res) => {
    res.send("Signup route")
})
app.get("/api/auth/login", (req, res) => {
    res.send("Login route")
})
app.get("/api/auth/logout", (req, res) => {
    res.send("Logout route")
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);

})