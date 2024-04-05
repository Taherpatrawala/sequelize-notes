const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

db.sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
