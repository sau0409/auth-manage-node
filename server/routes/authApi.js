require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//read user data file
let userData;
async function readFile() {
  try {
    let data = await fs.readFile("./data/user.json", "utf-8");
    userData = JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

//write into userdata file
async function writeFile(data) {
  try {
    await fs.writeFile("./data/user.json", data);
  } catch (err) {
    console.log(err);
  }
}

//check user
function findUser(userId, userData) {
  return userData.find((el) => {
    return String(el.userId) === String(userId);
  });
}

//user login
router.post("/login", async (req, res) => {
  try {
    let userId = req.body.userId;
    let password = req.body.password;

    //read userData file
    await readFile();

    //check if user exist
    let user = findUser(userId, userData);
    if (!user) {
      console.log("user does not exist");
      res.sendStatus(404);
      res.end();
    }
    if (user) {
      const match = await bcrypt.compare(String(password), user.password);
      if (match) {
        console.log("user login succesfull");
        // res.sendStatus(200);
        // res.end();
        const accessToken = jwt.sign({userId, password}, process.env.ACCESS_TOKEN_SECRET);
        //res.json({accessToken});
        res.redirect(`/?token=${accessToken}&userId=${userId}`);
      } else {
        console.log("user login faled");
        res.sendStatus(401);
        res.end();
      }
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//user signup
router.post("/signup", async (req, res) => {
  try {
    let userId = req.body.userId;
    let password = req.body.password;
    let repeat_pass = req.body.repeatpassword;

    //check passwords
    if (repeat_pass !== password) {
      console.log("passwords do not match");
      res.sendStatus(409);
      res.end();
      return;
    }
    //read user data file
    await readFile();

    //check if user exist
    let user = findUser(userId, userData);
    if (user) {
      console.log("user id alrerady exists");
      res.sendStatus(409);
      res.end();
    } else {
      const hashedPassword = await bcrypt.hash(String(password), 10);
      if (hashedPassword) {
        userData.push({ userId, password: hashedPassword });
        writeFile(JSON.stringify(userData));
        console.log("user created");
        // res.sendStatus(200);
        // res.end();
        res.redirect("/");
      }
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//user deletion
router.post("/delete", async (req, res) => {
  try {
    let userId = req.body.userId;
    let password = req.body.password;
    //read user data file
    await readFile();

    //check if user exist
    let user = findUser(userId, userData);
    if (!user) {
      console.log("user does not exist");
      res.sendStatus(404);
      res.end();
    }

    if (user) {
      const match = await bcrypt.compare(String(password), user.password);
      if (match) {
        userData = userData.filter((el) => {
          return String(el.userId) !== String(userId);
        });
        writeFile(JSON.stringify(userData));
        console.log("user deletion succesfull");
        // res.sendStatus(200);
        // res.end();
        res.redirect("/");
      } else {
        console.log("user authentication faled");
        res.sendStatus(401);
        res.end();
      }
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

module.exports = router;
