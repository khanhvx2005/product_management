const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productCategorySchema = new mongoose.Schema({
  title: String,
  parent_id: { type: String, default: "" },
  description: String,
  position: Number,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  deleted: { type: Boolean, default: false },
  thumbnail: String,
  status: String,
  deletedAt: Date,
  createdBy: {
    account_id: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }

}, { timestamps: true });
const productCategory = mongoose.model('productCategory', productCategorySchema, "products-category");
module.exports = productCategory;