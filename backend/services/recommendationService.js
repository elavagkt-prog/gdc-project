const Scheme = require('../models/scheme');

// MAIN recommendation logic
const recommendSchemes = async ({ text, age, income, state }) => {
  const lowerText = text.toLowerCase();

  let lifeEventsFilter = [];
  if (lowerText.includes("student")) lifeEventsFilter.push("student");
  if (lowerText.includes("farmer")) lifeEventsFilter.push("farmer");
  if (lowerText.includes("job") || lowerText.includes("unemployed")) {
    lifeEventsFilter.push("unemployed");
  }

  const schemes = await Scheme.find({
    lifeEvents: { $in: lifeEventsFilter },
  });

  return schemes;
};

// API controller
exports.recommendSchemesAI = async (req, res) => {
  try {
    const { text, age = 0, income = 0, state = "All" } = req.body;

    const schemes = await recommendSchemes({
      text,
      age,
      income,
      state,
    });

    res.json({
      recommendations: schemes,
      count: schemes.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Recommendation failed" });
  }
};
