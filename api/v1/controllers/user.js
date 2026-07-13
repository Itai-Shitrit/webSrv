const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userModel = require('../models/user');

module.exports={
    getAll:async(req,res)=>{
        try{
             const data=await userModel.find(); //
             return res.status(200).json(data);
        }
        catch(err){
             return res.status(500).json(err);
        }
    },
     //הפעלת השאילתה וקבלת התוצאות בתוך פונקציית החזרה;   
    getById:async(req,res)=>{
        const uid=req.params.id;
        try{
             const data=await userModel.find({uid:uid}); //
             return res.status(200).json(data);
        }
        catch(err){
             return res.status(500).json(err);
        }
    },

    add:async(req,res)=>{
        // הוספת משתמש חדש
        let data=req.body;
        const arrUser=userModel.find({email:data.email});
        if(arrUser.length>0) // במידה ונמצא משתמש עם המייל שנשלח, מחזירים הודעה מתאימה
            return res.status(200).json({msg:'User Already Exist'});

        const hashPass=await bcrypt.hash(data.pass,10); // הצפנת הסיסמא שקיבלנו
        data.pass=hashPass; // עדכון הסיסמא המוצפנת באובייקט שקיבלנו
        let newUser = await userModel.insertOne(data); // שמירה בבסיס הנתונים
        return res.status(201).json(newUser); // החזרת פרטי המשתמש החדש
    },

    update:async(req,res)=>{
    const uid=req.params.id; // קבלת קוד המוצר שנשלח
    const data=req.body;
    if(data.pass!=undefined)
        data.pass=await bcrypt.hash(data.pass,10);
    const updatedUser = await userModel.updateOne({uid:uid},data);
    return res.status(200).json(updatedUser);
    },

    delete:async(req,res)=>{
    const uid=req.params.id; // קבלת קוד המוצר שנשלח
    try{
        const result=await userModel.deleteOne({uid:uid});
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err.message});
    }
    },
    
    login:async(req,res)=>{
    //התחברות
    let data=req.body; // שמירת התוכן שנשלח בגוף הבקשה
    let users =await userModel.find({email:data.email});
    if(users.length==0)  // במידה ולא נמצא משתמש עם המייל שנשלח, מחזירים תשובה
    {
        return res.status(200).json({msg:`User / Password not correct`});
    }
    let user=users[0];
    let status=await bcrypt.compare(data.pass,user.pass);
    if(status==false)
    {
        return res.status(200).json({msg:`User / Password not correct`});
    }
    const token=jwt.sign({uid:user.uid,email:user.email},process.env.PRIVATE_KEY,{expiresIn:'1h'});
    return res.status(200).json({status:true,error:null,token});
    }
};
