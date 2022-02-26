const userValidate = require("./users.validate");
const User = require("./users.model");
const bycrpt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    // Get the user from the request body
    const user = req.body;
    //Check valid
    let validated = userValidate.validateRegister(user);
    if (validated.error != null)
      return res.status(400).send(validated.error.details[0].message);
    // Check if user already exists
    const checkEmail = await User.findOne({ email: user.email });
    if (checkEmail) return res.status(400).send("Email already exists");

    // Hash the password
    const salt = await bycrpt.genSalt(saltRounds);
    user.password = await bycrpt.hash(user.password, salt);

    //create user
    const newUser = new User(user);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  try {
    // Get the user from the request body
    const user = req.body;
    //Check valid
    let validated = userValidate.validateLogin(user);
    if (validated.error != null)
      return res.status(400).send(validated.error.details[0].message);

    // Check if user already exists
    const checkEmail = await User.findOne({ email: user.email });
    if (!checkEmail) return res.status(400).send("Email not found");

    // Check if password is correct
    const checkPassword = await bycrpt.compare(
      user.password,
      checkEmail.password
    );
    if (!checkPassword) return res.status(400).send("Password is incorrect");

    // Create and assign a token
    const expiresIn = 60 * 60;
    const token = jwt.sign({ _id: checkEmail._id }, process.env.TOKEN_SECRET, {
      expiresIn,
    });
    res.json({ token, expiresIn });

    // res.send("Login success");
  } catch (error) {
    console.log(error);
  }
}

async function getDashBoard(req, res) {
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { register, login, getDashBoard };
