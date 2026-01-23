require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/", require("./routes/user.routes"));
app.use("/api/watcho", require("./routes/watcho.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

