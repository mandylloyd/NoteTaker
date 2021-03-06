// Dependencies
var express = require("express")
// requiring path is necessary for using sendFile
var path = require("path");
var fs = require("fs");


var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// allows for nested objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// allows to use static
app.use(express.static('public'))


// ROUTING API

// create empty notes array
var notes = [];

// POST
// push new note to notes array
app.post("/api/notes", function(req, res){
    //create the new note variable and push it to the notes array
    var title = req.body.title
    var text = req.body.text
    var id = Math.floor(Math.random() * Math.floor(10000));
    var newNote = {title, text, id};
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

// GET
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

// DELETE
app.delete("/api/notes/:id", function(req, res) {
    data = fs.readFileSync("./db/db.json", "utf8"); 
    data = JSON.parse(data); 
    let notesString = data.filter(function(notesId){ 
        return notesId.id != req.params.id; 
    }); 
    data = JSON.stringify(notesString); 
    fs.writeFile("./db/db.json", data, "utf8", function(err){ 
        if (err){ 
          throw err;
    }
    }); 
  
      notes = JSON.parse(data)
      res.send(notes)
  
  }); 


// ROUTES

//sends notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

//sends main index html page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });



// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });