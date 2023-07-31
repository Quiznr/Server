const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const methodOverride = require("method-override");

const sequelize = require("./config/connection");
const cors = require("cors"); // Require the cors module

const app = express();

const PORT = process.env.PORT || 3002;

const sess = {
  secret: "Super secret secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1800000, // 30 minutes
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  next();
});

app.use(session(sess));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

const allowedOrigins = [
  "http://localhost:3000", // Allow requests from localhost during development
  "https://quiznr-b1865f6950cd.herokuapp.com/", // Allow requests from your live frontend
];

// CORS middleware configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is in the allowed origins list or if it's undefined (allow requests without an Origin header)
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Set the Access-Control-Allow-Credentials header to true
  })
);

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
