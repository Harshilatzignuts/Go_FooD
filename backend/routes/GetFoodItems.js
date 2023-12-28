const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.food_items, global.food_category]);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
