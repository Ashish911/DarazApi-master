const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Daraz', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true,
    useFindAndModify:false
})
.then(()=>{
    console.log("Database has been successfully connected")
})
.catch(err =>{
    console.log("Error while connecting")
    console.log(e.toString())
})

module.exports = mongoose;