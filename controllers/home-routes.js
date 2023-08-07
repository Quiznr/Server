const router = require("express").Router();
const { User, Quiz } = require("../models");

// GET all users for homepage
router.get("/home", async (req, res) => {
  console.log("Hello123");
  try {
    // Assuming you have a method to fetch all users from your User model
    const quizzes = await Quiz.findAll();

    // Send the users as a JSON response
    res.json(quizzes);
  } catch (error) {
    // Handle any errors that might occur during the database query or processing
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/home", async (req, res) => {
  console.log("Hello123");
  try {
    // Assuming you have the required data for the new quiz in the request body
    const { quiz_name, quiz_description, quiz_category, quiz_difficulty } =
      req.body;

    // Create the new quiz in the database using the Quiz model
    const newQuiz = await Quiz.create({
      quiz_name,
      quiz_description,
      quiz_category,
      quiz_difficulty,
    });

    // Send the newly created quiz as a JSON response
    res.status(201).json(newQuiz);
  } catch (error) {
    // Handle any errors that might occur during the database query or processing
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/quiz/:id", async (req, res) => {
  try {
    const quizId = req.params.id;

    // Retrieve the quiz by its ID along with its associated questions
    const quiz = await Quiz.findByPk(quizId, {
      include: "questions", // Make sure your association name is correct
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Send the quiz data to the client
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
