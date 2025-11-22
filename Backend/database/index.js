const mongoose = require("mongoose");

async function connectDatabase() {
  await mongoose.connect(process.env.DATABASE_URI);
}

module.exports = connectDatabase;
