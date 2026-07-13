const http=require('http'); // שילוב ספריית http בפרויקט
const app=require('./app');
const port=5050; // הגדרת היציאה אליה יאזין השרת
const srv=http.createServer(app); // יצירת אובייקט שרת
srv.listen(port, ()=>{
    console.log('Server Is Up')
});  // העלאת השרת לאוויר

// זה השינוי שאני עושה כרגע...אין לי משהו אחר לעשות
