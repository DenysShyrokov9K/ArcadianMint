const express = require("express");
const connectDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const Moralis = require("moralis").default;
require("dotenv").config();
// Connect to Database
connectDB();

// Initialize Middleware
app.use(express.json({ strict: false }));

app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use("/api/transaction", require("./routes/api/transaction"));

if (process.env.NODE_ENV === "production") {
    // Set Static Folder
    app.use(express.static(__dirname + "/build"));
    app.get("/*", function (req, res) {
      res.sendFile(__dirname + "/build/index.html", function (err) {
        if (err) {
          res.status(500).send(err);
        }
      });
    });
  }

// SERVER
const PORT = process.env.PORT || 5000;
// const PORT = 5000;

app.listen(PORT, async () => {
  console.log(`Server started on PORT ${PORT}`);
  await Moralis.start({
    apiKey: "AetCqI9YB4mfxA15Ttx9NJL1JU2XyvWiy5HOL0U8slf2wa1KNbICpnqF7PORhpJJ"
    // ...and any other configuration
  });
  console.log("Moralis started");
});
