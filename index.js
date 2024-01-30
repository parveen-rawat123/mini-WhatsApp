const express = require("express")
const app = express()
const mongoose = require('mongoose');
const port = 8080;
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};


//index route
app.get("/chats", async (req, res) => {
    let chats = await chat.find()
    // console.log(chats)
    res.render("index.ejs", { chats })
});

//new route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

//create route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newchat = new chat({
        from: from,
        to: to,
        msg: msg,
        create_at: new Date()
    });
    newchat
        .save()
        .then((res) => {
            console.log("chat was saved")
        })
        .catch((err) => {
            console.log(err)
        });
    res.redirect("/chats")
})

//edit route
app.get("/chats/:id/edit", async (req,res)=>{
      let {id} = req.params; 
      let chats = await chat.findById(id)
      res.render("edit.ejs",{chats})
});

// update route
app.put("/chats/:id", async (req,res)=>{
let {id} = req.params;
let {msg : newmsg} = req.body;
let updatechat =  await chat.findByIdAndUpdate(
    id,
    {msg : newmsg},
    {runValidators : true , new:true}
);
res.redirect("/chats")
});

//distroy route
app.delete("/chats/:id", async (req,res)=>{
    let {id} = req.params;
   let deletedchat= await  chat.findByIdAndDelete(id);
   res.redirect("/chats")

})







app.get("/", (req, res) => {
    res.send("root is working")
});

app.listen(8080, () => {
    console.log(`server is listening on port ${port}`)
});
