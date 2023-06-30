const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const connectToDatabase = require("./Mongo.cjs");
const createError = require("http-errors");

const user = require("./models/user.cjs");
const Plant = require("./models/plant.cjs");
const Notification = require("./models/notification.cjs");

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await user.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.json("notexist");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = { email: email, password: password };

  try {
    const check = await user.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await user.insertMany([data]);
    }
  } catch (error) {
    res.json("notexist");
  }
});

app.post("/addplant", async (req, res, next) => {
  try {
    const newPlant = new Plant({
      name: req.body.name,
      water: req.body.water,
      frequency: req.body.frequency,
      image: req.body.image
    });
    await newPlant.save();
    res.send("Plant added");
    console.log("Plant added");
  } catch (error) {
    console.log(error);
  }
});

app.get("/getplants", async (req, res, next) => {
  try {
    const plants = await Plant.find();
    res.send(plants);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteplant/:id", async (req, res, next) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.send("Plant deleted");
    console.log("Plant deleted");
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateplant/:id", async (req, res, next) => {
  try {
    await Plant.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      water: req.body.water,
      frequency: req.body.frequency,
      image: req.body.image
    });
    res.send("Plant updated");
    console.log("Plant updated");
  } catch (error) {
    console.log(error);
  }
});

app.post("/sendnotification", async (req, res, next) => {
  try {
    const newNotification = new Notification({
      plant: req.body.plant,
      date: req.body.date,
      message: req.body.message
    });
    await newNotification.save();
    res.send("Notification sent");
    console.log("Notification sent");
  } catch (error) {
    console.log(error);
  }
});

app.get("/getnotifications", async (req, res, next) => {
  try {
    const notifications = await Notification.find();
    res.send(notifications);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deletenotification/:id", async (req, res, next) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.send("Notification deleted");
    console.log("Notification deleted");
  } catch (error) {
    console.log(error);
  }
});