const express = require('express');
const connectDB = require('./config/db')
const path = require('path')

const app= express();


//connect database
connectDB();


//init MiddleWare
app.use(express.json({extended:false}));


//define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/todo',require('./routes/api/todo'));


//serve static assets in production
if(process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('todo/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'todo','build','index.html'));
    });

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`server running in port ${PORT}`));