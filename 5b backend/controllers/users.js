const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

//   4.16
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: "Username and password are required fields" });
  }

  if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({
        error:
          "Username and password should be at least three characters in length",
      });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

// 4.15
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("notes");
  response.json(users);
});

module.exports = usersRouter;
