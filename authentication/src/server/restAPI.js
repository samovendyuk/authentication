const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

function hashPassword(arg) {
  const hmac = crypto.createHash("SHA256");
  const decodePassword = hmac.update(arg).digest("hex");
  return decodePassword;
}

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "users",
  password: "",
});

app.get("/users", function (request, response) {
  connection.query("select * from users", (err, result) => {
    response.send(result);
  });
});

app.post("/login", async function (req, res) {
  const password = req.body.password;
  const name = req.body.name;
  if (name === "" || password === "") {
    return res.status(400).send({ message: "Invalid name or password" });
  }
  const sql = `select * from users where name=? and password=?;`;
  connection.query(sql, [name, hashPassword(password)], function (err, result) {
    if (result.length === 0) {
      console.log(err);
      return res.status(400).send({ message: "Invalid name or password" });
    }
    updateUserLoginStatus("active", name);
    res.send(result);
  });
});

app.post("/register", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const data = req.body;
  const pwd = hashPassword(data.password);

  const sql = `INSERT INTO users(name, email, password, status, lastlogin, position) VALUES('${data.name}', '${data.email}', '${pwd}', '${data.status}', '${data.lastlogin}', '${data.position}');`;
  connection.query(sql, (err, result) => {
    if (err) console.log(err);

    res.send(result);
  });
});

app.delete("/users/:name", function (req, res) {
  const name = req.params.name;
  console.log(name);
  const sql = `DELETE FROM users WHERE name='${name}';`;
  connection.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/users", function (req, res) {
  const status = req.body.status;
  const name = req.body.name;
  const sql = `UPDATE users SET status=? WHERE name=?`;
  connection.query(sql, [status, name], (err, result) => {
    if (err) console.log(err);
    if (status === "block") {
      return res
        .status(400)
        .send({
          message:
            "You was block. You can't entry at system untill admin unlock you",
        });
    }
    res.send(result);
  });
});

function updateUserLoginStatus(status, name) {
  const now = new Date().toLocaleString();
  const sql = `UPDATE users SET status=?, lastlogin=? WHERE name=?`;
  connection.query(sql, [status, now, name], (err, result) => {
    if (err) console.log(err);
  });
}

app.listen(4200);
