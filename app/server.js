const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const VALID_USER = "admin";
const VALID_PASS = "password123";

app.get("/login", (req, res) => {
  const flash = req.query.flash || "";
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Login</title></head>
    <body>
      <h1>Login Page</h1>
      ${flash ? `<div id="flash">${flash}</div>` : ""}
      <form method="POST" action="/login">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </body>
    </html>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || username !== VALID_USER) {
    return res.redirect("/login?flash=Your username is invalid!");
  }
  if (!password || password !== VALID_PASS) {
    return res.redirect("/login?flash=Your password is invalid!");
  }
  res.redirect("/secure");
});

app.get("/secure", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Secure Area</title></head>
    <body>
      <div id="flash">You logged into a secure area!</div>
      <h1>Secure Area</h1>
      <a href="/logout">Logout</a>
    </body>
    </html>
  `);
});

app.get("/logout", (req, res) => {
  res.redirect("/login?flash=You logged out of the secure area!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Login app running at http://localhost:${PORT}/login`);
});

module.exports = app;
