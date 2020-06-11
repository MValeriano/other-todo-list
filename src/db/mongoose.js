const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/todo-api",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
})