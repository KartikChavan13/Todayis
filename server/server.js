const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "VTZIIOFSDrrIdNiIaLPsJhIzmDvzEpgv",
  database: "test",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});


app.get("/details", (req, res) => {
  const sql = "SELECT * FROM familyinfo";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/details", (req, res) => {
  const {
    name, fatherName,motherName,siblings,aadhar,pan,dob,status,address,} = req.body;
const sql = `INSERT INTO familyinfo 
    (name, fatherName, motherName, siblings, aadhar, pan, dob, status, address) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [name, fatherName, motherName, siblings, aadhar, pan, dob, status, address],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Record inserted", id: result.insertId });
    }
  );
});


app.put("/details/:id", (req, res) => {
  const id = req.params.id;
  const {
    name, fatherName, motherName, siblings, aadhar, pan, dob, status, address,} = req.body;

  const sql = `UPDATE familyinfo SET 
    name=?, fatherName=?, motherName=?, siblings=?, aadhar=?, pan=?, dob=?, status=?, address=? 
    WHERE id=?`;

  db.query(
    sql,
    [name, fatherName, motherName, siblings, aadhar, pan, dob, status, address, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Record updated" });
    }
  );
});


app.delete("/details/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM familyinfo WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Record deleted" });
  });
});

// app.get("/day", (req, res) => {
//   const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday"
//   ];

//   const today = new Date();
//   const dayName = days[today.getDay()];

//   res.json({
//     dayNumber: today.getDay(),
//     dayName: dayName
//   });
// });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
