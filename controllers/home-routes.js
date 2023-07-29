const router = require("express").Router();
const { User } = require("../models");

// GET all users for homepage
router.get("/", async (req, res) => {
  console.log("Hello123");
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
