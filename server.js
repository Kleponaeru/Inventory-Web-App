const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// API Routes
app.get("/", (req, res) => {
  res.send("This is node server!");
});

//ITEMS
app.get("/api/items", (req, res) => {
  con.query("SELECT * FROM items", function (err, result) {
    if (err) {
      res.status(500).json({ error: "Query Fail" });
      return;
    }
    res.json(result);
  });
});

//Users routes
app.post("/api/register", async (req, res) => {
  const { f_name, l_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await generateUniqueId(con);
    const query =
      "INSERT INTO users (user_id, f_name, l_name, email, password) VALUES (?, ?, ?, ?, ?)";

    con.query(
      query,
      [userId, f_name, l_name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Failed to register user" });
        }
        res.json({
          message: "User registered successfully!",
        });
      }
    );
  } catch (err) {
    console.error("Error generating user ID:", err);
    res.status(500).json({ error: "Failed to generate user ID" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    con.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ error: "Database query failed" });
        }

        if (result.length === 0) {
          // No user found with this email
          return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = result[0];
        console.log("Hash from DB:", user.password);

        try {
          // Compare hashed password from DB with input password
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          console.log("Password match:", isPasswordMatch);

          if (isPasswordMatch) {
            // Generate a JWT token
            const token = jwt.sign(
              { userId: user.user_id, email: user.email },
              process.env.JWT_SECRET, // Ensure JWT_SECRET is properly set in .env
              { expiresIn: "1h" } // Token expires in 1 hour
            );
            // Send response with the JWT token
            return res.json({
              message: "Login successful!",
              token,
            });
          } else {
            return res.status(400).json({ error: "Invalid email or password" });
          }
        } catch (bcryptError) {
          console.error("Error comparing password hashes:", bcryptError);
          return res.status(500).json({ error: "Internal server error" });
        }
      }
    );
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users", (req, res) => {
  con.query("SELECT * FROM users", function (err, result) {
    if (err) {
      res.status(500).json({ error: "Query Fail" });
      return;
    }
    res.json(result);
  });
});

//SET PORT AND ROUTE
app.use((req, res) => {
  res.status(404).send("Route not found");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function generateRandomId() {
  return Math.floor(10000 + Math.random() * 90000); // Random number between 10000 and 99999
}

async function generateUniqueId(con) {
  return new Promise((resolve, reject) => {
    const id = generateRandomId();
    const query = "SELECT user_id FROM users WHERE user_id = ?";

    con.query(query, [id], (err, result) => {
      if (err) return reject(err);
      if (result.length > 0) {
        // Conflict, try again
        return resolve(generateUniqueId(con));
      }
      resolve(id); // Unique ID
    });
  });
}
