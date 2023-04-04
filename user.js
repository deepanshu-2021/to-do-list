const mongoose = require("mongoose");
const listschema = new mongoose.Schema({
  items: String,
});
module.exports = mongoose.model("list", listschema);
