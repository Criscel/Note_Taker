var express = require("express");
var fs = require("fs")
var path = require("path")

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for static file
app.use(express.static("public"));

//Redirect to index.html page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//Redirect to notes.html page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

 //to get notes then send it to db.json
 app.get('/api/notes', function (req, res) { 
   res.json(JSON.parse(fs.readFileSync('db/db.json')))
 });
      //console.log(res);

//add new notes
  app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", function (err, notes) {
      if (err) throw err

      notes = JSON.parse(notes)
  
      var id = notes[notes.length - 1].id + 1
      var newNote = { title: req.body.title, text: req.body.text, id: id }
      var activeNote = notes.concat(newNote)
  
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (err, data) {
        if (err) throw err

        //console.log(activeNote)
        res.json(activeNote);
      })
    })
  })

//delete notes (BONUS)
app.delete("/api/notes/:id", function (req, res) {
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  fs.readFile(__dirname + "/db/db.json", function (err, notes) {
    if (err) throw err

    notes = JSON.parse(notes)

    notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (err, data) {
      if (err) throw err

      res.json(notes)
    })
  })
})

app.put("/api/notes/:id", function(req, res) {
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  fs.readFile(__dirname + "db/db.json", function(error, notes) {
    if (error ){
      return console.log(error)
    }
    notes.JSONparse(notes)

    notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname +"db/db.json", JSON.stringify(notes), function (error, data) {
      if (error) {
        return error
      }
      res.json(notes)
    })
  })
}) 

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });