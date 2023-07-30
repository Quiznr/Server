const router = require("express").Router();
const { User } = require("../models");

// GET all users for homepage
router.get("/home", async (req, res) => {
  console.log("Hello123");
  try {
    // Assuming you have a method to fetch all users from your User model
    const users = await User.findAll();

    // Send the users as a JSON response
    res.json(users);
  } catch (error) {
    // Handle any errors that might occur during the database query or processing
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
