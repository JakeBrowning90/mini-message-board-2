require("dotenv").config();
console.log(process.env.CONNECTION_STRING);

const express = require("express");
const messagesRouter = require("./routes/messageRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();
const path = require("node:path");

//parses form payloads and sets it to the req.body
app.use(express.urlencoded({ extended: true }));

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date(),
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date(),
//   },
// ];

// app.get("/", (req, res) => {
//   res.render("index", { title: "Mini Messageboard", messages: messages });
// });

// app.get("/new", (req, res) => {
//   res.render("form");
// });

// app.get("/detail/:messageIndex", (req, res) => {
//   res.render("detail", { message: messages[req.params.messageIndex] });
// });

// app.post("/new", (req, res) => {
//   messages.push({
//     text: req.body.messageInput,
//     user: req.body.authorInput,
//     added: new Date(),
//   });
//   res.redirect("/");
// });

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// base mount path is `/users` and will always execute on that specific mount path, and yes including `/users/a/b/c`
app.use("/", messagesRouter);
app.use("/users", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
