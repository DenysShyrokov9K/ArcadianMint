const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VolumeSchema = new Schema({
  mainCount: {
    type: Number,
    default: 0,
  },
  sonicCount: {
    type: Number,
    default: 0,
  },
  mtopCount: {
    type: Number,
    default: 0,
  },
  totalVolume: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Volume = mongoose.model("volume", VolumeSchema);
