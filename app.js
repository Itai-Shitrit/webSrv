require('dotenv').config(); //הפעלת הפונקציה שטוענת את קובץ דוט איאנוי
const express=require('express') // חיבור לספריית אקפרס
const app=express(); // יצירת אפליקצית אקספרס
const routerProduct=require('./api/v1/routes/products'); // ייבוא של הראוטר של המוצרים
const routerUser=require('./api/v1/routes/user'); // ייבוא של הראוטר של המשתמשים
//const routerCategory=require('./api/v1/routes/category'); // ייבוא של הראוטר של הקטגוריות
const morgan=require('morgan');
const myLog=require('./api/v1/middlewares/myLog'); // צירפנו את שכבת הלוג שבנינו
//const jwt=require('jsonwebtoken');
const auth=require('./api/v1/middlewares/auth');
const mongoose=require('mongoose');
const session=require('express-session');
const cors=require('cors');
const { default: MongoStore } = require('connect-mongo');
const hbs=require('express-handlebars');

app.engine('handlebars', hbs.engine()); // הגדרת מערכת טמפלטינג - תבניות
app.set('view engine','handlebars'); //הגדרת מערכת הטמפלטינג הפעילה במערכת
app.set('views','./views'); // הגדרת התיקייה המכילה את התצוגות
app.set('layouts','./views/layouts'); //  הגדרת התקייה שמכילה את קבצי התוכנית
app.set('partials','./views/partials'); // הגדרת התיקייה עבור חלקי העיצוב

const connStr=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SRV}/ecomdb`; 

app.use(cors()); // הוספת שכבת ביניים שמאפשרת גישה מכל כתובת

mongoose.connect(connStr).then((conn)=>{
    console.log('Connected Successfully')
}); // יצירת חיבור לבסיס הנתונים

app.use(session({
    secret:process.env.PRIVATE_KEY,
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:connStr
    }),
    cookie:{
        path:'/',
        secure:false,
        maxAge:1000*60*20,
    }
}));

app.use(myLog); // הוספת שכבת הלוג שצירפנו אל האפליקציה
app.use(morgan('dev')); // הוספת שכבה שמבצעת רישום של כל בקשה במערכת אל הקונסול, משמש אותנו לצורך מעקב ובקרה
//נוסיף שכבת ביניים שמטפלת בגוף של הבקשה הנשלחת בפורמט גייסון
app.use(express.json());
//נוסיף שכבת ביניים שמטפלת בגוף של הבקשה הנשלחת בפורמט יו.אר.אל אנקודד
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
  
app.use('/product',routerProduct); // שילוב של הראוטר מוצרים 
app.use('/user',routerUser); // שילוב של הראוטר מוצרים 

module.exports=app; // יצא של המודול שכתבנו