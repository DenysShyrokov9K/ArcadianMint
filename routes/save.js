const MintTransaction = require('../models/mintTransaction');

const SaveTransaction = ({userAddress,nftName,game,transferType,transactionID,amount}) => {
    try{
        let transaction = new MintTransaction({          
            userAddress: userAddress,
            nftName: nftName,
            game: game,
            transferType: transferType,
            transactionID: transactionID,
            amount: amount
        })
        transaction.save();
    }catch(err){
        console.log(err);
    }    
}

module.exports = SaveTransaction;