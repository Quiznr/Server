const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const methodOverride = require("method-override");

const sequelize = require("./config/connection");

const app = express();
const corsOptions = {
  origin: [
    "https://quiznr-b1865f6950cd.herokuapp.com/",
    "http://localhost:3000",
  ],
};

app.use(cors(corsOptions));
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

app.use(session(sess));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
