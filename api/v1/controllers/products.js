const productModel=require('../models/product');
module.exports={
    getAll:async(req,res)=>{
        try{
             const data=await productModel.find().lean(); //
             return res.render("products",{layouts:"main",data,length:data.length});
             //return res.status(200).json(data);
        }
        catch(err){
             return res.status(500).json(err);
        }
    },
    
    getById:async(req,res)=>{
        const pid=req.params.id; // קבלת קוד המוצר שנשלח
            try{
            const data=await productModel.find({pid}).lean(); //
            let prod={};
            if(data.length>0)
                prod=data[0];
            
            //return res.status(200).json(data);
            return res.render("product",{layout:"main", prod})

        }
        catch(err){
             return res.status(500).json(err);
        }
    },

        add:async(req,res)=>{
    // הוספת מוצר חדש
    let data=req.body; // שמירת התוכן שנשלח בגוף הבקשה
    try{
        const result=await productModel.create(data);
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err.message});
    }
},
    
    update:async(req,res)=>{
    const pid=req.params.id; // קבלת קוד המוצר שנשלח
    let data=req.body; // שמירת התוכן שנשלח בגוף הבקשה
    try{
        const result=await productModel.updateOne({pid:pid},data);
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err.message});
    }
},
    
    delete:async(req,res)=>{
    const pid=req.params.id; // קבלת קוד המוצר שנשלח
    try{
        const result=await productModel.deleteOne({pid:pid});
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err.message});
    }
}};