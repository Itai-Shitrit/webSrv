const mongoose=require('mongoose');
mongoose.pluralize(null);

//הגדרת סכימה/ מבנה טבלאי עבור הטבלה/ אוסף של המשתמשים
const userSchema = mongoose.Schema({
    uid:Number,
    email:String,
    pass:String,
    fullname:String,   
},{versionKey:false});
const userModel=mongoose.model('User', userSchema); // יצירת מודל/ מבנה , דרך גישה לאוסף/ טבלה של מתשמשים

module.exports=userModel; // ייצוא של המודל