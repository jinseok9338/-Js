// server.js

var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");

app.set("views", "./views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.html");
});

var count = 1;

io.on("connection", function (socket) {
  console.log("user connected: ", socket.id);
  var name = "익명" + count++;
  socket.name = name;
  io.to(socket.id).emit("create name", name);

  socket.on("disconnect", function () {
    console.log("user disconnected: " + socket.id + " " + socket.name);
  });

  // 다른 유저가 타이핑 중임을 나타내기 위한 코드
  socket.on("typing", (name) => {
    console.log(`user ${name} is typing`);
    io.emit("istyping", `user ${name} is typing`, name);
  });

  socket.on("send message", function (name, text) {
    var msg = name + " : " + text;
    socket.name = name;
    console.log(msg);
    io.emit("receive message", msg);
  });
});

http.listen(3000, function () {
  console.log("server on..");
});
