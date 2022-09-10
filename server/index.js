const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "englishtochka",
});

app.get("/users", (req, res) => {
  const sqlInsert = "SELECT * FROM `users`";
  connection.query(sqlInsert, (err, result) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

app.get("/coins", (req, res) => {
  const sqlInsert = "SELECT * FROM `coins`";
  connection.query(sqlInsert, (err, result) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

app.get("/products", (req, res) => {
  const sqlInsert = "SELECT * FROM `products`";
  connection.query(sqlInsert, (err, result) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

app.get("/orders", (req, res) => {
  const sqlInsert = "SELECT * FROM `orders_users`";
  connection.query(sqlInsert, (err, result) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

app.listen(4000, () => {
  console.log("Сервер успешно запущени");
});
