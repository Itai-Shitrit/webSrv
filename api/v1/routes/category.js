//const express=require('express') // חיבור לספריית אקפרס
const router=require('express').Router(); // יצירת אובייקט של ראוטר עבור הניתובים
const productController=require('../controllers/category'); //חיבור לקונטרול
//הפונקציה מקבלת שני פרמטרים, הראשון נתיב של הבקשה, 
// והשני קוד שרת לביצוע המורכב מאובייקטים של בקשה ותשובה
router.get('/',productController.getAll); // בקשה בשיטת גט לשרת   
router.get('/:id',productController.getById);
router.delete('/:id',productController.delete); // מחיקה
router.post('/',productController.add);  // הוספת חדש
router.put('/:id',productController.update); // עדכון

module.exports=router; // יצוא של הראוטר