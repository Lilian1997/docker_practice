var express = require("express");
var mysql = require("mysql");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
app.use(cors());

app.get("/", function (req, res) {
  res.send("hello");
});

app.listen(2407, function () {
  console.log("伺服器啟動中" + new Date().toLocaleTimeString());
});

var conn = mysql.createConnection({
  host: "db",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_ROOT_PASSWORD || "password",
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DB || "practice",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("連線mySQL成功");
});

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  req.mysql = conn;
  req.mysql.queryAsync = function (cmd, params) {
    return new Promise(function (resolve, reject) {
      req.mysql.query(cmd, params, function (err, data) {
        resolve(data);
      });
    });
  };

  next();
});

// // 可選日期
// app.get("/Ticket/Cart/DateSelect", async function (req, res) {
//   // console.log(req.query);
//   var sql = "SELECT `date` FROM `amount` WHERE `available`= 1";

//   await conn.query(sql, function (err, rows) {
//     let isDone = "notDone";
//     if (err) {
//       res.send(err);
//     } else {
//       isDone = "Done";
//       // res.send(isDone);
//       res.send({ isDone, data: rows }); // 返回数据给前端
//     }
//   });
//   // console.log(data);
// });

// // 可選場次
// app.post("/Ticket/Cart/SessionSelect", async function (req, res) {
//   // console.log(req.body);
//   var sql =
//     "SELECT `session` FROM `amount` WHERE `available` = 1 AND `date` = ?";

//   await conn.query(sql, [req.body.date], function (err, rows) {
//     let isDone = "notDone";
//     if (err) {
//       res.send(err);
//     } else {
//       isDone = "Done";
//       res.send({ isDone, data: rows });
//     }
//   });
// });
