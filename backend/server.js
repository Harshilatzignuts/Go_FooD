const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const app = express();

const PORT = 5000;

// Connect to MongoDB
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

connectDB();

app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

app.use("/api/", require("./routes/CreatUser"));

app.use("/api/", require("./routes/GetFoodItems"));

app.use("/api/", require("./routes/OrderData"));

app.use("/api/", require("./routes/MyOrderData"));

app.use("/api/", require("./routes/GetGeoLocation"));

app.listen(PORT, () => {});
