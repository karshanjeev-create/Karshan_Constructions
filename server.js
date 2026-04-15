const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get("/", (req, res) => {
  res.send("Karshan backend running");
});

app.post("/lead", (req, res) => {
  const { name, phone } = req.body;

  db.query(
    "INSERT INTO leads (name, phone) VALUES (?, ?)",
    [name, phone],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Lead saved" });
    }
  );
});

app.post("/internship", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    college,
    degree,
    department,
    duration,
    reason
  } = req.body;

  db.query(
    `INSERT INTO internships
    (first_name,last_name,email,phone,college,degree,department,duration,reason)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [first_name,last_name,email,phone,college,degree,department,duration,reason],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Application submitted" });
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});