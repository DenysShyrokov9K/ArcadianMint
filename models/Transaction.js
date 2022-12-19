const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({    
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    userAddress: {
        type:String,
        required: true
    },
    game:{
        type:String,
        required: true
    },
    transactionId:{
        type:String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = Transaction = mongoose.model("transaction",TransactionSchema);