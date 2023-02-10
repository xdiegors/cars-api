const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json()); // for body post

app.get("/", (req, res, next) => {
  res.send("GET OK");
});

app.get("/cars", (req, res, next) => {
  fs.readFile("data/car.json", "utf8", (err, data) => {
    if (err) {
      res.send("An error ocurred. Database file is not available");
    }
    res.json(data);
  });
});

app.get("/cars/:id", (req, res, next) => {
  fs.readFile("data/car.json", "utf8", (err, data) => {
    if (err) {
      res.send("An error ocurred. Database file is not available");
    }
    const cars = JSON.parse(data);
    const car = cars.find((car) => car.id === parseInt(req.params.id));
    if (!car) {
      res.status(404).send("Car not found");
    }
    res.json(car);
  });
});

app.post("/cars", (req, res, next) => {
  fs.readFile("data/car.json", "utf8", (err, data) => {
    if (err) {
      res.send("An error ocurred. Database file is not available");
    }
    const cars = JSON.parse(data);

    cars.push(req.body);
    fs.writeFile("data/car.json", JSON.stringify(cars, null, 2), (err) => {
      if (err) {
        res.status(500).send("An error ocurred");
      }
    });
    res.send("Car added");
  });
});

app.put("/cars/:id", (req, res, next) => {
  res.send("PUT OK");
});
app.delete("/cars/:id", (req, res, next) => {
  res.send("DELETE OK");
});

app.listen(3000, () => {
  console.log(`API Started on dir ${__dirname}${__filename}`);
});
