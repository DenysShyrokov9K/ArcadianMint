const Transaction = require('../models/Transaction');

const SaveTransaction = ({name,type,userAddress,game,transactionId,amount,date}) => {
    try{
        let transaction = new Transaction({   
            name: name,  
            type: type,   
            userAddress: userAddress,
            game: game,
            transactionId:transactionId,
            amount:amount,
            date: date
        })
        transaction.save();
        return ;
    }catch(err){
        console.log(err);
    }    
}

module.exports = SaveTransaction;