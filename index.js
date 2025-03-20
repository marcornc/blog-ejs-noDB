import express from "express"


const app = express()
const port = 3000




app.get("/", (req, res)=>{

    res.render("index.ejs", {seeAllPosts: false})
})

app.get("/all-posts", (req, res)=>{

    res.render("post-list.ejs", {seeAllPosts: true})
})

app.listen(port, ()=>{
    console.log("App listening to port "+port)
})
