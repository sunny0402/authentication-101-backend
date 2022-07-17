const User = require("../model/User");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  console.log("registerController: handleNewUser: new user: ", user);

  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password required." });
  }

  //check for duplicate usernames in db
  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) {
    return res.sendStatus(409); //conflict ... user already exists
  }

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store new user
    const result = await User.create({
      username: user,
      // roles: { User: 2001 }, ... set as default in User model
      password: hashedPwd,
    });

    console.log("registerController: MongoDB: result: ", result);

    res.status(201).json({ success: `New user: ${user}. Created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
