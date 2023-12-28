const express = require("express");
const Orders = require("../model/Orders");
const router = express.Router();

router.post("/MyOrderData", async (req, res) => {
  try {
    let eId = await Orders.findOne({ email: req.body.email });
    //
    res.json({ orderData: eId });
  } catch (error) {
    res.send("Error", error.message);
  }
});

module.exports = router;
