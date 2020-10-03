const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    text :{
        type:String,
        required:true
    },
    title: {
        type:String
    },
    date:{
        type: Date,
        default : Date.now
    }
});

module.exports = Todo = mongoose.model('todo',TodoSchema);