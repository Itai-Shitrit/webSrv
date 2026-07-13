const mySqlDB=require('../models/mySqlDB')
module.exports={
    getAll:(req,res)=>{
        const sql='select * from t_product';
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
    const pid=req.params.id; // קבלת קוד המוצר שנשלח
    const sql=`select * from t_product where pid=${pid}`;
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
    let arr=Object.keys(data);
    let fields='';
    let values='';
    for(let i=0;i<arr.length;i++)
    {
        fields+=`${arr[i]},`;
        values+=`'${data[arr[i]]}',`; 
    }
    fields=fields.substring(0,fields.length-1);
    values=values.substring(0,values.length-1);
    let sql=`Insert into t_product (${fields}) Values(${values})`;

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
    
    update:(req,res)=>{
    const pid=req.params.id; // קבלת קוד המוצר שנשלח
    let sql='update t_product set ';
    let data=req.body; // שמירת התוכן שנשלח בגוף הבקשה
    let arr=Object.keys(data);
    for(let i=0;i<arr.length;i++)
    {
         sql +=`${arr[i]}='${data[arr[i]]}',`;
    }
    sql=sql.substring(0,sql.length-1);
    sql+='Where pid='+ pid;
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
    const pid=req.params.id; // קבלת קוד המוצר שנשלח
    const sql=`delete from t_product where pid=${pid}`;
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
            //איתי שטרית
});
    }}