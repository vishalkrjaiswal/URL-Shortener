import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    required: true,
    index:true,
    unique: true
  },
  originalUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const shortUrl = mongoose.model("Url", urlSchema);

export default shortUrl;
