const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({

  project: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String
  },

  source: {
    type: String,
    default: "website"
  },

  status: {
    type: String,
    enum: ["new", "contacted", "site_visit", "closed"],
    default: "new"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Lead", leadSchema);