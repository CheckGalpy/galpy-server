const mongoose = require("mongoose");

const connectURL = `mongodb+srv://${process.env.ATLAS_ID}:${process.env.ATLAS_PW}@galpy.aeezddc.mongodb.net/${process.env.ATLAS_DB_Name}`;

mongoose.set("strictQuery", true);
mongoose.connect(connectURL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Could not connect to MongoDB Atlas")
);
db.once("open", console.log.bind(console, "Connected to MongoDB Atlas..."));
