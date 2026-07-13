module.exports=(req,res,next)=>{
    console.log(`${req.method} ${req.path} -- My Log`);

    next();
};