import express from "express"
import bodyParser  from "body-parser"
import pg from "pg"


const app = express();
const port = 3000;
const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"feedback",
    password:"mukdb",
    port:5432
})

db.connect();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    const result = await db.query("SELECT * FROM feedback");
    res.render("index.ejs",{feedbacks:result.rows});
    console.log(result.rows);
})
app.post("/submit",async(req,res)=>{
    const {name,feedback} = req.body;
    await db.query("INSERT INTO feedback (name, message) VALUES ($1, $2)", [name, feedback]);
    res.redirect("/");
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});