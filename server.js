require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Database Connection
connectDB();

//Middlewares
app.use(express.json());

//Routes path
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/private", require("./routes/api/private"));

app.use("/api/public/users", require("./routes/api/example.js"));

//Port number
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});

//handling server crash on errors
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logging Error: ${err}`);
  server.close(() => process.exit(1));
});
