const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed", error.message);
    process.exit(1);
  }
}

module.exports = connect;
