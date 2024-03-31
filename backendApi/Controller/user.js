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
      success: false,
      message: "something went wrong try again later",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        seccess: false,
        message: "Invalid username",
      });
    }

    const isCorrectPasword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isCorrectPasword) {
      return res.json({
        seccess: false,
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

    res.cookie("access_token", token, { httpOnly: true }).json({
      status: true,
      message: "login successfully",
      token,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const google = (req, res) => {

    res.json({
        status: true,
        message: "this is demo google api"
    })
}

const signOut = (req, res) => {
    res.json({
        status: true,
        message: " logout successfull "
    })
}

module.exports = {
  register,
  login,
  google,
  signOut,
};
