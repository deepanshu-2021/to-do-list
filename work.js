const mongoose = require("mongoose");
const workschema = new mongoose.Schema({
  items: String,
});
module.exports = mongoose.model("worklist", workschema);
