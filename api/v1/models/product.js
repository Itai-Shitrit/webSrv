const mongoose=require('mongoose');
mongoose.pluralize(null);

//הגדרת סכימה/ מבנה טבלאי עבור הטבלה/ אוסף של המוצרים
const productSchema = mongoose.Schema({
    pid:Number,
    pname:String,
    price:Number,
    pdesc:String,
    picname:String,
    cid:Number
},{versionKey:false});
const productModel=mongoose.model('products', productSchema); // יצירת מודל/ מבנה , דרך גישה לאוסף/ טבלה של מוצרים

module.exports=productModel; // ייצוא של המודל