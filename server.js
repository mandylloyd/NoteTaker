// Dependencies
var express = require("express")
// requiring path is necessary for using sendFile vvvv
var path = require("path");


var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
// allows for nested objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// allows to use static
app.use(express.static('public'))


// ROUTES

//sends notes page
app.get("/notes", function(req, res) {
    // res.send("Welcome to the Star Wars Page!");
    // using sendFile you can return the selected html page
    res.sendFile(path.join(__dirname, "notes.html"));
  });

//sends main index html page
app.get("*", function(req, res) {
    // res.send("Welcome to the Star Wars Page!");
    // using sendFile you can return the selected html page
    res.sendFile(path.join(__dirname, "index.html"));
  });


// ROUTING API

// create empty notes array
var notes = [];

// push new note to notes array
app.post("/api/notes", function(req, res){
    //create the new note variable and push it to the notes array
    var newTitle = req.body.title,
    var newText = req.body.text,
    var newNote = (newTitle, newText);
    console.log(newNote),
    notes.push(newNote);
    console.log(notes),
    //stringify the notes array
    var notesString = JSON.stringify(notes)
    console.log(notesString)
    //readFile of db.json
    fs.readFile(path.join(__dirname, "/db/db.json"), notesString, function(err, data) {
        if (err) {
            console.log("Something went wrong.")
        }
        console.log("New note has been added to db.json.")
    }
});

app.get("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "/db/db.json"), function(err, data) {
        if (err) {
            console.log("Something went wrong.")
        }
        console.log("Success!")
    }
});

//delete note code here
// need to give all added notes a unique id so they can be searched and filtered
// maybe a random number assigned to an id variable when a note is posted?

// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });