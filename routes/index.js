var express = require("express");
var router = express.Router();

var userDB = [
  { username: "shashi", password: "124" },
  { username: "samri", password: "farzi" }
];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* check login  */
router.post("/login", function(req, res, next) {
  try {
    console.log("db is", userDB);
    if (req.body.username && req.body.password) {
      let user = userDB.filter(user => user.username === req.body.username);
      if (user.length > 0) {
        let isUserLogin =
          user.filter(item => item.password === req.body.password).length > 0;
        if (isUserLogin) {
          return res.json({
            success: 1,
            message: "Successfully login"
          });
        } else {
          return res.json({
            success: 0,
            message: "Incorrect username of password"
          });
        }
      } else {
        return res.json({
          success: 0,
          message: "User not registered"
        });
      }
    } else {
      return res.json({
        success: 0,
        message: "Insufficient number of parameters sent"
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Unable to reach server"
    });
  }
});

/** new  user registration */
router.post("/signup", function(req, res, next) {
  try {
    if (req.body.username && req.body.password) {
      let user = userDB.filter(user => user.username === req.body.username);
      if (user.length > 0) {
        return res.json({
          success: 0,
          message: "User already exist"
        });
      } else {
        userDB.push({
          username: req.body.username,
          password: req.body.password
        });
        return res.json({
          success: 1,
          message: "User registered successfully"
        });
      }
    } else {
      return res.json({
        success: 0,
        message: "Insufficient number of parameters sent"
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Unable to reach server"
    });
  }
});
module.exports = router;
