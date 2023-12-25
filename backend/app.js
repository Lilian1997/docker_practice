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
  setTimeout(connectToMySQL, 10000);
});

// var conn = mysql.createConnection({
//   host: "db",
//   user: "root",
//   password: "password",
//   port: 3306,
//   database: "practice",
// });

// var conn = mysql.createConnection({
//   host: "db",
//   user: process.env.MYSQL_USER || "root",
//   password: process.env.MYSQL_ROOT_PASSWORD || "password",
//   port: process.env.MYSQL_PORT || 3306,
//   database: process.env.MYSQL_DB || "practice",
// });

function connectToMySQL() {
  var conn = mysql.createConnection({
    host: "db",
    user: "root",
    password: "password",
    port: 3306,
    database: "practice",
  });

  conn.connect((err) => {
    if (err) {
      console.error("連線mySQL失敗，等待重試...");
      // 如果連線失敗，等待 10 秒再嘗試連接
      setTimeout(connectToMySQL, 10000);
    } else {
      console.log("連線mySQL成功");
      setupApp(conn); // MySQL 連線成功後設定應用程式
    }
  });
}

function setupApp(conn) {
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

  app.get("/User", function (req, res) {
    console.log(req);
    var sql = "SELECT * FROM user";

    conn.query(sql, function (err, rows) {
      let isDone = "notDone";
      if (err) {
        res.send(err);
      } else {
        isDone = "Done";
        res.send({ isDone, data: rows });
      }
    });
  });
}
