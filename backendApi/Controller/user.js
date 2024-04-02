const usermodel = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    await usermodel.create({ ...req.body, password: hash });
    res.json({
      success: true,
      message: "user created Successfully",
    });

  } catch (error) {
    res.status(400).json({
      status: false,
      message: "something went wrong try again later",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        status: false,
        message: "Invalid username",
      });
    }

    const isCorrectPasword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isCorrectPasword) {
      return res.json({
        status: false,
        message: "Invalid password",
      });
    }

    const expiryDate = Math.floor(new Date().getTime() / 1000) + 3600;

    const payload = {
      id: user._id,
      name: user.username,
      role: user.role,
      exp: expiryDate,
    };

    const token = jwt.sign(payload, process.env.JWT_TOKEN);

    const loginUser = await usermodel.findById(user._id).select('-password');

    res.cookie("access_token", token, { httpOnly: true }).json({
      success: true,
      message: "login successfully",
      userDetails:loginUser,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const google = (req, res) => {
  res.json({
    success: true,
    message: "this is demo google api",
  });
};

const signOut = (req, res) => {
  // console.log(req);
  try {
    res.cookie('access_token', '', { expires: new Date(0) });
    res.json({
      success: true,
      message: " logout successfull ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  google,
  signOut,

  //crud
  //updateuser,
  //deleteUser,
  //viewAlluser
};
