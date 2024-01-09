const express = require("express");
const mongoose = require("mongoose");
const Usermodel = require("./models/User");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Pankajkumar:STGMbYnVI1asgqRN@cluster0.7vpk8id.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Db connected SuceessFully!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await Usermodel.findOne({ username });

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (foundUser.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await Usermodel.create({ username, password });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

app.listen(3000, () => {
  console.log("Server is Running On port 3000");
});
