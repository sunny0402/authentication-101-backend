const User = require("../model/User");

const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log("refreshTokenController: cookies.jwt: ", cookies.jwt);

  //optional chaining ... if we have cookies ... and they have jwt property
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403); //forbidden

  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }
    const roles = Object.values(foundUser.roles);
    console.log("refreshTokenController: roles: ", roles);
    //send access token as refresh token was verified
    const accessToken = jwt.sign(
      {
        UserInfo: { username: decoded.username, roles: roles },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" } //short duration for demonstration
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
