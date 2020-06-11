const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/tasks');

const app  = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log(`The servidor is on the air in port ${port}`);
})
