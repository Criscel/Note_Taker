const express = required("express");
const fs = required("fs");
const database = require("./Develop/db/db.json");
const path = require("path")

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//to get notes then send it to db.json
app.get("api/database", (req, res) => {
    res.sendFile(path.join(_dirname, "/db/db.json"))
})
console.log(res);

//add new notes
app.post("api/database", (req, res) => {
    
});

//delete notes (BONUS)
// app.delete("api/database", (req, res) => {
//}

//Redirect to index.html page
app.get("/", function (req, res) {
    res.sendFile(path.join(_dirname,"/public/index.html"));
});

//Redirect to notes.html page
app.get("/", function (req, res) {
    res.sendFile(path.join(_dirname,"/public/notes.html"));
});


app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });