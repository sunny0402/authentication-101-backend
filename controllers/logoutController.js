const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  //on client also delete access token
  const cookies = req.cookies;
  //optional chaining ... if we have cookies ... and they have jwt property
  if (!cookies?.jwt) return res.sendStatus(204); //no cookie to erase ... successful ... no content
  const refreshToken = cookies.jwt;

  // is refresh token in database ... user with such a token
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  //no user with cookie, but suck a cookie exists
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204); //successful but no content
  }

  //delete refresh token in databse
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" }; //make refresh token property empty string
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  //when deleteing cookie specify same properties it was initialized with except axAge: 24 * 60 * 60 * 1000
  //secure: true - only serves on https
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
