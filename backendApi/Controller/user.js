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
      return res.cookie("access_token", "", { expires: new Date(0) }).json({
        status: false,
        message: "Invalid password",
      });
    }

    const expiryDate = Math.floor(new Date().getTime() / 1000) + 3600;

    const payload = {
      id: user._id,
      role: user.role,
      exp: expiryDate,
    };

    const token = jwt.sign(payload, process.env.JWT_TOKEN);

    const loginUser = await usermodel.findById(user._id).select("-password");

    res.cookie("access_token", token, { httpOnly: true }).json({
      success: true,
      message: "login successfully",
      userDetails: loginUser,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

// not do this
const google = (req, res) => {
  res.json({
    success: true,
    message: "this is demo google api",
  });
};

const signOut = (req, res) => {
  // console.log(req);
  try {
    res.cookie("access_token", "", { expires: new Date(0) });
    res.json({
      success: true,
      message: " logout successfull ",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

// complete
const updateUser = async (req, res) => {
 console.log(req.user);
  try {
    const updatedpassword = req.body.password;
    // console.log("1", updatedpassword);
    // console.log("2", req.user.password);
    if (updatedpassword === " ") {
      // console.log("3", updatedpassword);
      updatedpassword = req.user.password;

      await usermodel.findByIdAndUpdate(req.user._id, {
        $set: {
          ...req.body,
          password: updatedpassword,
        },
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(updatedpassword, salt);
      await usermodel.findByIdAndUpdate(req.user._id, {
        $set: {
          ...req.body,
          password: hash,
        },
      });
    }

    const updatedUser = await usermodel.findById(req.user._id).select("-password");

    res.json({
      success: true,
      message: "updated succesfully",
      userDetails: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  // console.log(req.user._id);
  try {
    const deletedUser = await usermodel.findByIdAndDelete(req.user._id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User Deleted Successfully",
    });
    
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "something went wrong try again later",
    });
  }
};

const getUser = (req, res) => {
  // console.log(req);
  try {
    res.json({
      success: true,
      message: "updated succesfully",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  register, //complete
  login, //complete
  google,
  signOut, //complete
  updateUser, //complete
  deleteUser, //complete
  getUser,
};
