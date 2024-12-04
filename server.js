const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory",
});

con.connect(function (err) {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected as id " + con.threadId);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("This is node server!");
});
app.get("/api/items", (req, res) => {
  con.query("SELECT * FROM items", function (err, result) {
    if (err) {
      res.status(500).json({ error: "Query Fail" });
      return;
    }
    res.json(result);
  });
});

app.post("/api/input", (req, res) => {
  res.json({ message: "This is from the backend!" });
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
