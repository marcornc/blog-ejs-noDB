import express from "express"
import bodyParser from "body-parser"
import fs from "fs"


const app = express()
const port = 3000

function formattedDate(){
    const date = new Date
    
    // Estrai ore, minuti, giorno, mese e anno
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mesi da 0 a 11
    const year = date.getFullYear();
    
    // Formatta la data
    return formattedDate = `${hours}.${minutes} - ${day}.${month}.${year}`;

}

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=>{

    res.render("index.ejs", {seeAllPosts: false})
})

app.get("/all-posts", (req, res)=>{

    res.render("post-list.ejs", {seeAllPosts: true})
})

app.post("/submit", (req, res)=>{

    const date = formattedDate()

    fs.writeFile(`./blog-posts/${date}.txt`, `Date & Time:\n${req.body.userNikname} \n\nTile:\n${req.body.postTitle} \n\nContent:\n${req.body.postContent}`, (error)=>{
        if (error) throw error
        console.log("Blog Post Saved!")
    })
    res.redirect("/")
})

app.listen(port, ()=>{
    console.log("App listening to port "+port)
})
 