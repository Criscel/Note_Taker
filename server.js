var express = require("express");
var fs = require("fs");
var notes = require("./Develop/db/db.json");
var path = require("path")

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//to get notes then send it to db.json
app.get("api/notes", (req, res) => {
    res.sendFile(path.join(_dirname, "/db/db.json"))
    console.log(res);
})


//add new notes
app.post("api/notes", (req, res) => {
    const oldNotes = fs.readFileSync("./db/db.json");
    const newNote = req.body;
    console.log(newNote);
   
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(oldNotes))
    res.json(newNote)
});

//delete notes (BONUS)
// app.delete("api/database", (req, res) => {
//}

//Redirect to index.html page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

//Redirect to notes.html page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});


app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });