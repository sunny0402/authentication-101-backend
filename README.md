## Authentication API

Tutorial Created by: https://www.youtube.com/DaveGrayTeachesCode

Github repo: https://github.com/gitdagray/node_js_resources

Implement with JSON file then with database.

## Notes

{"user": "alex", "pwd": "1234"}
{"user": "alex2", "pwd": "12345"}

## JWT

```
npm i dotenv jsonwebtoken cookie-parser
```

Access tokens in memory (curent application state). Not in local storage, or a cookie.
Refresh token issued in http only cookie. Require expiration.
Refresh token not able to issue new refresh token.

XSS: Cross-site scripting
CSRF: CS Request Forgery

API will verify access token every time it is used to make a request.

Store reference to refresh token in database.
Storing reference token allows user to delete refresh token bu logging out.

require("crypto").randomBytes(64).toString("hex");
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET

```
const jwt = require("jsonwebtoken")
require("dotenv).config()
const fsPromises = require('fs').promises
const path = require("path")
```

Run employees get route through middleware before passing to controller.
So only protecting this specific route.

```
//routes/api/employee.js
const verifyJWT = require("../../middleware/verifyJWT");

router
  .route("/")
  .get(verifyJWT, employeesController.getAllEmployees)
```

## Next Starting Point

https://youtu.be/f2EqECiTBL8?t=18641

## TODO

Create two branches backend_mongo backend_mysql
Follow tutorial with Mongo then switch to Sequelize ...
