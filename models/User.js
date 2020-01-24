const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

userSchema.methods.generateToken = async function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "school_management_system"
  );
  user.token = token;
  await user.save();

  return token;
};

userSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    console.log("Matched");
    throw new Error("Unable to login");
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new Error("unable to login");
  }

  return user;
};

userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

// userSchema.methods.toJSON = async function() {
//   const user = this;

//   const userObj = user.toObject();

//   delete userObj.password;
//   delete userObj.token;

//   return userObj;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
