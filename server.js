// Dependencies
var express = require("express")
// requiring path is necessary for using sendFile vvvv
var path = require("path");
var fs = require("fs");


var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
// allows for nested objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// allows to use static
app.use(express.static('public'))


// ROUTING API

// create empty notes array
var notes = [];

// push new note to notes array
app.post("/api/notes", function(req, res){
    //create the new note variable and push it to the notes array
    var title = req.body.title
    var text = req.body.text
    var id = Math.floor(Math.random() * Math.floor(1000000));
    var newNote = {title, text, id};
    // req.body.id = randomID();
    // var id = req.body.id;
            console.log(newNote)
    notes.push(newNote);
        console.log(notes);
    //stringify the notes array
    var notesString = JSON.stringify(notes)
        console.log(notesString)
    //readFile of db.json
    fs.writeFile(path.join(__dirname, "/db/db.json"), notesString, function(err) {
        if (err) {
            console.log("Something went wrong.")
        }
        console.log("New note has been added to db.json.")
    })
});

app.get("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8" ,function(err, data) {
        if (err) {
            console.log("Something went wrong.")
        }
        console.log("Success!")
        console.log(data);
        notes = JSON.parse(data);
        res.json(notes)
    })
});

app.delete("/api/notes", function(req,res)  {
    //or should this be thisId = id ?
    let thisId = req.body.id
    let deleteThisId = notes.filter(del => del.id !== thisId)
    notes = deleteThisId
    let notesString = JSON.stringify(notes)

    // "utf8" not needed because notesString is there
    fs.writeFile(path.join(__dirname, "/db/db.json"), notesString, function(err){
        if (err) {
            console.log(err)
        }
        res.writeHead(200)
        res.end()
    })
})


// maybe a random number assigned to an id variable when a note is posted?
// function randomID() {
//     var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
//     var uniqId = randLetter + Date.now();
//     console.log(uniqId)
// }


// ROUTES

//sends notes page
app.get("/notes", function(req, res) {
    // res.send("Welcome to the Star Wars Page!");
    // using sendFile you can return the selected html page
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

//sends main index html page
app.get("*", function(req, res) {
    // res.send("Welcome to the Star Wars Page!");
    // using sendFile you can return the selected html page
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });



// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });