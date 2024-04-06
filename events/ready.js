const { ActivityType } = require("discord.js");
// const mongoose = require("mongoose"); //npm i mongoose
// const mongodbURL = "mongodb+srv://reflqctnl:Z7dYtNMRSq0sYoKC@vfms.bizx1qj.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // if (!mongodbURL) return;

    // mongoose.set("strictQuery", false);

    // await mongoose.connect(mongodbURL || "", {
    //keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // });

    // if (mongoose.connect) {
    // mongoose.set("strictQuery", true);
    // console.log("The database is running!");
    // }

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
