const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./config/dbConnect");
const userRoutes = require("./routes/user.routes");
const blogRoutes = require("./routes/blog.routes");

app.use(cors());
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", blogRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("Server started");
});
