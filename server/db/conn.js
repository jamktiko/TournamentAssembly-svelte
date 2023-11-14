const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connection established");
		return true;
	} catch {
		console.log("Connection failed");
		return false;
	}
}

module.exports = { connect };
