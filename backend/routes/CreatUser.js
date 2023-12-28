const express = require("express");
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET =
  "068528156cbd5bf38f5be12c6ecc1aaa19845edd901fab985a91c1530b090fbf7d7378a24bbd9b5395e68a1c7957992a80536227a90f1cecdef60723614934dc";

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: req.body.email }).exec();
    if (duplicate)
      return res.status(409).json({ message: "User already exists" }); //Conflict

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: hashedPwd,
      });
      res.status(201).json({ success: true, message: "New user created!" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, user.password);

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect Password" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authToken: authToken, user: user });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

module.exports = router;
