const mongoose = require('mongoose');
const chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let allchats = [
    {
   from : "neha",
   to : "priya",  
   msg : "send me your exam sheets",
   create_at: new Date()
},
{
    from : "rohit",
    to : "mohit",  
    msg : "teach me js callbacks",
    create_at: new Date()
},
{
    from : "amit",
    to : "aamir",  
    msg : "hello how can i help you",
    create_at: new Date()
},
{
    from : "nitin",
    to : "akhilesh",  
    msg : "today you will come or not",
    create_at: new Date()
},
{
    from : "shivam",
    to : "krish",  
    msg : "let's do it ",
    create_at: new Date()
},
{
    from : "sarika",
    to : "ankita",  
    msg : "today i am not coming",
    create_at: new Date()
}
];

chat.insertMany(allchats);