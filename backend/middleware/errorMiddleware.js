
// we redefine the express error handler to check the status code, and set it 

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500 ;

    res.status(statusCode);
    
    res.json({
        message: err.message,
        //show us where is the error while production mode
        stack: process.env.NODE_ENV === 'production ? null : err.stack'
    })
}

module.exports = {
    errorHandler,
}