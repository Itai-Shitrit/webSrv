const mySqlDB=require('../models/mySqlDB');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

module.exports={
    getAll:(req,res)=>{
        const sql='select * from t_user';
        mySqlDB.query(sql,(err,results,feilds)=>{
            if(err==null)
            {
             console.log(results);
             return res.status(200).json(results);
            }
            else
            {
             console.log(err);
             return res.status(500).json({'error':err.message});
            }
   
}); //הפעלת השאילתה וקבלת התוצאות בתוך פונקציית החזרה;
},    
    getById:(req,res)=>{
    const uid=req.params.id; // קבלת קוד המוצר שנשלח
    const sql=`select * from t_user where uid=${uid}`;
        mySqlDB.query(sql,(err,results,feilds)=>{
            if(err==null)
            {
             console.log(results);
             return res.status(200).json(results);
            }
            else
            {
             console.log(err);
             return res.status(500).json({'error':err.message});
            }
});
},
    add:(req,res)=>{
    // הוספת מוצר חדש
     
    let data=req.body; // שמירת התוכן שנשלח בגוף הבקשה
    let arr=Object.keys(data); // מייצרת מערך של כל השדות שיש באובייקט
    let fields='';
    let values='';

    const sql=`Select * from t_user where email='${data.email}'`;
    mySqlDB.query(sql,(err,results,feilds)=>{
            if(err!=null) // במידה והייתה שגיאת מערכת מציגים הודעה מתאימה
            {
             console.log(results);
             return res.status(500).json({'error':err.message});
            }
            else if(results.length>0) // נמצא לפחות משתמש אחד עם השם שנכתב
            {
                return res.status(200).json({msg:'User Already Exist'});
            }
            for(let i=0;i<arr.length;i++)
                    {
                    if(arr[i]=='pass')
                    {
                        let pass=data[arr[i]];
                        let hashPass=bcrypt.hashSync(pass,10);
                        fields+=`${arr[i]},`;
                        values+=`'${hashPass}',`; 
                    }
                    else
                    {
                    fields+=`${arr[i]},`;
                    values+=`'${data[arr[i]]}',`;
                    }
                }
                fields=fields.substring(0,fields.length-1);
                values=values.substring(0,values.length-1);
                let sql=`Insert into t_user (${fields}) Values(${values})`;

                mySqlDB.query(sql,(err,results,feilds)=>{
                        if(err==null)
                        {
                        console.log(results);
                        return res.status(201).json(results);
                        }
                        else
                        {
                        console.log(err);
                        return res.status(500).json({'error':err.message});
                        }
            });
                    });


},    
    update:(req,res)=>{
    const uid=req.params.id; // קבלת קוד המוצר שנשלח
    let sql='update t_user set ';
    let data=req.body; // שמירת התוכן שנשלח בגוף הבקשה
    let arr=Object.keys(data);
    for(let i=0;i<arr.length;i++)
    {
         sql +=`${arr[i]}='${data[arr[i]]}',`;
    }
    sql=sql.substring(0,sql.length-1);
    sql+='Where uid='+ uid;
    console.log(sql);
    mySqlDB.query(sql,(err,results,feilds)=>{
            if(err==null)
            {
             console.log(results);
             return res.status(200).json(results);
            }
            else
            {
             console.log(err);
             return res.status(500).json({'error':err.message});
            }
    });
},   
    delete:(req,res)=>{
    const uid=req.params.id; // קבלת קוד המוצר שנשלח
    const sql=`delete from t_user where uid=${uid}`;
        mySqlDB.query(sql,(err,results,feilds)=>{
            if(err==null)
            {
             console.log(results);
             return res.status(200).json(results);
            }
            else
            {
             console.log(err);
             return res.status(500).json({'error':err.message});
            }
});
},
    login:(req,res)=>{
    //התחברות
     
    let data=req.body; // שמירת התוכן שנשלח בגוף הבקשה
    
    const sql=`Select * from t_user where email='${data.email}'`;
    mySqlDB.query(sql,(err,results)=>{
        if(err!=null) // במידה והייתה שגיאת מערכת מציגים הודעה מתאימה
        {
         console.log(results);
         return res.status(500).json({status:false,error:err.message,data:[]});
        }
        else if(results.length==0) // לא נמצא משתמש עם המייל שנשלח
        {
          return res.status(200).json({status:false,error:null,data:[]});
        }
        // המשתמש נמצא, נבדוק תקינות הסיסמא שהוזנה
        let user=results[0];
        bcrypt.compare(data.pass,user.pass,(err,same)=>{
            if(err!=null) // במידה והייתה שגיאת מערכת מציגים הודעה מתאימה
            {
             console.log(err);
                 return res.status(500).json({status:false,error:err.message,data:[]});
            }
            if(same==true)
            {
                //לאחר אימות הפרטים , נייצר טוקן עבור החיבור הנוכחי של המשתמש
               const token=jwt.sign({uid:user.uid,email:user.email},process.env.PRIVATE_KEY,{expiresIn:'1h'});
               return res.status(200).json({status:true,error:null,data:results,token});
            }
            else{
               return res.status(200).json({status:false,error:null,data:[]});

            }
        })
    });
}};
