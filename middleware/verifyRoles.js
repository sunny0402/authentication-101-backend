const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];

    //debug
    console.log("rolesArray: which roles required:  ", rolesArray);
    console.log("req.roles: which roles does user have: ", req.roles);

    //verifyJWT.js:  req.roles = decoded.UserInfo.roles;
    //inclues within map will create an array of true/false
    //need one true to verify that the role can access the route we are verifying

    ///routes/api/employees.js:
    //  .post(
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    // employeesController.createNewEmployee)

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
