const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB not connected");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// 6qf4rT7btkx2uVrY