const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (email, password, name) => {
  
  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    const error = new Error("Email already exists");
    error.status = 409;
    throw error;
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({
    email,
    password: hashedPassword,
    name: name
  });

  return await user.save();
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  
  if (!user){
    var error = new Error("User not found");
    error.status = 409;
    throw error;
  } 

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};
