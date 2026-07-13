//const express=require('express') // חיבור לספריית אקפרס
const router=require('express').Router(); // יצירת אובייקט של ראוטר עבור הניתובים
const userController=require('../controllers/user'); //חיבור לקונטרול
const auth=require('../middlewares/auth')
//הפונקציה מקבלת שני פרמטרים, הראשון נתיב של הבקשה, 
// והשני קוד שרת לביצוע המורכב מאובייקטים של בקשה ותשובה
router.get('/',userController.getAll); // בקשה בשיטת גט לשרת   
router.get('/:id',userController.getById);
router.delete('/:id',userController.delete); // מחיקה
router.post('/',userController.add);  // הוספת חדש
router.put('/:id',userController.update); // עדכון
router.post('/login',userController.login); // התחברות

module.exports=router; // יצוא של הראוטר