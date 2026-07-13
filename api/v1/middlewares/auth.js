const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]; //שולפת את הטוקן שנשלח
        const user=jwt.verify(token,process.env.PRIVATE_KEY);
        req.user=user;  // הוספת האובייקט של המייל והסיסמא לאובייקט הבקשה
        next(); // מעבר לשכבה הבאה באפליקציה

    }
    catch{
        return res.status(401).json({status:false, data:[], msg:'bad request/ not authorized'})
    }
};