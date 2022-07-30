const User = require("../model/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({
      message: "Username and password are required.",
    });

  const foundUser = await User.findOne({ username: user }).exec();

  if (!foundUser) return res.sendStatus(401); //unauthorized

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    //admin, editor, user
    //filter(Boolean): so do not send Null if a user only has one type of role
    const roles = Object.values(foundUser.roles).filter(Boolean);
    //create JWT
    const accessToken = jwt.sign(
      {
        UserInfo: { username: foundUser.username, roles: roles },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //save refresh token of current user in db
    //  will alow us to create logout route
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    console.log("authController: result: ", result);
    console.log("authController: roles: ", roles);

    //send refresh token as a cookie
    //if testing refresh endpoint with postman... comment out secure: true
    //however, refresh token does not store any info about user roles...

    // ONLY for testing with postman comment seccure
    // secure: true,
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // send authorization roles and access token to user
    res.json({ roles, accessToken }); //frontend needs to store access token in memory
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
