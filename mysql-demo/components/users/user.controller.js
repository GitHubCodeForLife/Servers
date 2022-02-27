const userValidate = require("./user.validate");
const bycrpt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const UserServices = require("./user.services");

async function register(req, res) {
  try {
    let user = req.body;
    console.log({ user });
    //Check valid
    let validated = userValidate.validateRegister(user);
    if (validated.error != null)
      return res.status(400).send(validated.error.details[0].message);
    //check if user exist
    let userExist = await UserServices.findOneByEmail(user.email);
    if (userExist) return res.status(400).send("User already exist");
    //hash password
    const salt = await bycrpt.genSalt(saltRounds);
    user.password = await bycrpt.hash(user.password, salt);

    //create user
    user = await UserServices.createNewOne(user);

    //send response
    res.json({
      message: "Register success",
      user,
    });
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  try {
    //get user
    const user = req.body;
    //check valid
    const validated = userValidate.validateLogin(user);
    if (validated.error != null)
      return res.status(400).send(validated.error.details[0].message);
    //check user exist
    const userExist = await UserServices.findOneByEmail(user.email);
    if (!userExist) return res.status(400).send("User not exist");

    //check password
    const compare = await bycrpt.compare(user.password, userExist.password);
    if (!compare) return res.status(400).send("Password incorrect");
    //create token
    const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_SECRET);
    res.json({
      message: "Login success",
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getDashBoard(req, res) {
  try {
    const user = await UserServices.findOneById(req.user.id);
    res.json({
      message: "Get Dashboard success",
      user,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { register, login, getDashBoard };
