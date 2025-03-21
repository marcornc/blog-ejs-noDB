import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

const allPosts = []

function Post(title, date, nikname, content){
  this.title = title
  this.date = date
  this.nikname = nikname
  this.content = content
}

function formattedDate() {
  const date = new Date();

  // Estrai ore, minuti, giorno, mese e anno
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mesi da 0 a 11
  const year = date.getFullYear();

  // Formatta la data
  return `${hours}.${minutes} - ${day}.${month}.${year}`;
}





app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { seeAllPosts: false });
});

app.get("/all-posts", (req, res) => {

  res.render("post-list.ejs", { seeAllPosts: true, allPosts });
});

app.post("/submit", (req, res) => {
  const date = formattedDate();

  const post = new Post(
    req.body["post-title"],
    date,
    req.body["user-nikname"],
    req.body["post-content"]
  )
  allPosts.push(post)
  res.redirect("/")
})


app.listen(port, ()=>{
  console.log("App listening on port ", port)
})