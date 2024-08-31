const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();
const path = require("node:path");

// application-level middlewares, will always execute on every incoming requests

//parses form payloads and sets it to the req.body
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   // You can of course also create your own for your own use-case!
//   // Just make sure to call `next`
//   next();
// });

// const links = [
//   { href: "/", text: "Home" },
//   { href: "new", text: "New" },
// ];

const users = ["Rose", "Cake", "Biff"];

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

// app.get("/detail", (req, res) => {
//   res.render("detail", {message: "message details"});
// });

app.get("/detail/:messageIndex", (req, res) => {
  res.render("detail", {message: messages[req.params.messageIndex]});
});

app.post("/new", (req, res) => {
  messages.push({
    text: req.body.messageInput,
    user: req.body.authorInput,
    added: new Date(),
  });
  res.redirect("/");
});

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// base mount path is `/users` and will always execute on that specific mount path, and yes including `/users/a/b/c`
app.use("/users", userRouter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
