const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productSchema = new mongoose.Schema({
  title: String, 
  description:String ,
  price:Number,
  discountPercentage:Number,
  rating:Number,
  stock:Number,
  position:Number,
  slug: { 
    type: String, 
    slug: "title" ,
    unique: true
  },
  deleted: {type :Boolean , default:false} ,
  thumbnail:String,
  status:String ,


},{ timestamps: true });
const Product = mongoose.model('Product', productSchema);
module.exports = Product;