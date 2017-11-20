const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sideSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number
  },
  available: {
    type: Boolean
  },
  image: {
    type: String
  }
});

export default mongoose.model("Side", sideSchema);

