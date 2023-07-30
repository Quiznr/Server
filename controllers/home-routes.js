const router = require("express").Router();
const { User } = require("../models");

// GET all users for homepage
router.get("/home", async (req, res) => {
  console.log("Hello123");
});

module.exports = router;
