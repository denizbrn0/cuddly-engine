const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = "8080";
const mainRouter = require("./router/routers.js");
const { auth } = require("express-openid-connect");
require("dotenv").config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));
app.use(express.json()); // <==== parse request body as JSON
app.use(express.urlencoded({ extended: true }));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
