const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const connectDB = require("./config/dbConnect");
const userRoutes = require("./routes/user.routes");
const blogRoutes = require("./routes/blog.routes");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", blogRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log("Server started");
});