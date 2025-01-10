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

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token is missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.user = user;
    next();
  });
};

// API Routes
app.get("/", (req, res) => {
  res.send("This is node server!");
});

//ITEMS
app.get("/api/items", (req, res) => {
  con.query(
    "SELECT * FROM items WHERE deleted_at IS NULL",
    function (err, result) {
      if (err) {
        res.status(500).json({ error: "Query Fail" });
        return;
      }
      res.json(result);
    }
  );
});
app.get("/api/items/:id", (req, res) => {
  const itemId = req.params.id;
  con.query(
    "SELECT * FROM items WHERE id = ?",
    [itemId],
    function (err, result) {
      if (err) {
        res.status(500).json({ error: "Query Fail" });
        return;
      }
      if (result.length > 0) {
        res.json(result[0]); // Return the first matching item
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    }
  );
});

//CATEGORIES
app.get("/api/categories", (req, res) => {
  con.query(
    "SELECT * FROM item_categories WHERE active = 'T' ORDER BY category_name",
    function (err, result) {
      if (err) {
        res.status(500).json({ error: "Query Fail" });
        return;
      }
      res.json(result);
    }
  );
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
          return res.status(500).json({ error: "Login failed" });
        }

        if (result.length === 0) {
          return res.status(400).json({ error: "Email not found" }); // More specific error
        }

        const user = result[0];

        try {
          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (isPasswordMatch) {
            const token = jwt.sign(
              { userId: user.user_id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );

            return res.json({
              message: "Login successful!",
              token,
            });
          } else {
            return res.status(400).json({ error: "Incorrect password" }); // More specific error
          }
        } catch (bcryptError) {
          console.error("Password comparison failed:", bcryptError);
          return res.status(500).json({ error: "Password comparison failed" });
        }
      }
    );
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/user", authenticateToken, (req, res) => {
  const userId = req.user.userId;

  con.query(
    "SELECT * FROM users WHERE user_id = ?",
    [userId],
    function (err, result) {
      if (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Query Failed" });
        return;
      }

      console.log("Database query result:", result);

      if (!result || result.length === 0) {
        console.log("No user found for ID:", userId);
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(result[0]);
    }
  );
});

//CRUD INVENTORY
app.post("/api/items/add", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const {
    item_name,
    id_category,
    item_category,
    qty,
    supplier,
    brand,
    cost,
    sales_price,
    description,
    expiration_date,
    arrival_date,
  } = req.body;

  try {
    const query =
      "INSERT INTO items (item_name, id_category, item_category, qty, supplier, brand, cost, sale_price, description, expiration_date, arrival_date, created_by, item_status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    con.query(
      query,
      [
        item_name,
        id_category,
        item_category,
        qty,
        supplier,
        brand,
        cost,
        sales_price,
        description,
        expiration_date,
        arrival_date,
        userId,
        "Available",
      ],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Failed to insert item" });
        }
        res.json({
          message: "Data inserted successfully!",
          itemId: result.insertId,
        });
      }
    );
  } catch (err) {
    console.error("Error generating user ID:", err);
    res.status(500).json({ error: "Failed to generate user ID" });
  }
});
app.put("/api/items/update/:id", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const {
    item_name,
    id_category,
    item_category,
    qty,
    supplier,
    brand,
    cost,
    sales_price,
    description,
    expiration_date,
    arrival_date,
  } = req.body;

  try {
    const itemId = req.params.id;
    const query = `
    UPDATE items 
    SET item_name = ?, 
        id_category = ?, 
        item_category = ?, 
        qty = ?, 
        supplier = ?, 
        brand = ?, 
        cost = ?, 
        sale_price = ?, 
        description = ?, 
        expiration_date = ?, 
        arrival_date = ?, 
        updated_by = ?, 
        updated_at = NOW(), 
        item_status = ? 
    WHERE id = ?
  `;

    con.query(
      query,
      [
        item_name,
        id_category,
        item_category,
        qty,
        supplier,
        brand,
        cost,
        sales_price,
        description,
        expiration_date,
        arrival_date,
        userId,
        "Available",
        itemId,
      ],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Failed to update item" });
        }
        res.json({
          message: "Data updated successfully!",
          itemId: result.insertId,
        });
      }
    );
  } catch (err) {
    console.error("Error updating user ID:", err);
    res.status(500).json({ error: "Failed to generate user ID" });
  }
});

app.post("/api/items/delete/:id", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const itemId = req.params.id; // Getting itemId from the URL parameter
    const query = `
      UPDATE items 
      SET deleted_by = ?, 
          deleted_at = NOW()
      WHERE id = ?
    `;

    con.query(query, [userId, itemId], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Failed to update item" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.json({
        message: "Data deleted successfully!",
        itemId: itemId,
      });
    });
  } catch (err) {
    console.error("Error updating user ID:", err);
    res.status(500).json({ error: "Failed to generate user ID" });
  }
});

//TRANSACTION
app.get("/api/transactions", (req, res) => {
  con.query(
    "SELECT * FROM transactions WHERE deleted_at IS NULL",
    function (err, result) {
      if (err) {
        res.status(500).json({ error: "Query Fail" });
        return;
      }
      res.json(result);
    }
  );
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
