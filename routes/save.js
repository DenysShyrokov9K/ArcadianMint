const Transaction = require('../models/Transaction');

const SaveTransaction = ({name,userAddress,game,transactionId,amount}) => {
    try{
        let transaction = new Transaction({   
            name: name,     
            userAddress: userAddress,
            game: game,
            transactionId:transactionId,
            amount:amount
        })
        console.log("save  = ",transaction);
        transaction.save();
        return ;
    }catch(err){
        console.log(err);
    }    
}

module.exports = SaveTransaction;