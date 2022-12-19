const express = require("express");
const router = express.Router();
const Transaction = require('../../models/Transaction');
const SaveTransaction = require('../save');

// @route   get api/users/test
// @desc    test User
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "this is test" }));

// @route   POST api/transaction
// @desc    Register User
// @access  Public
router.post("/", (req,res) => {
    try{    
        res.json("success");
        SaveTransaction(req.body);
    } catch(err){
        res.status(404).json("Transaction Error");
    }
});

// @route   POST api/transaction/findResults
// @desc    Register User
// @access  Public
router.post("/getTransactions",async (req,res) => {
    try{
        const {userAddress ,type ,sort ,game} = req.body;
        console.log(userAddress);
        console.log(sort);
        let users; 
        if(sort === "latest"){
            if(game === 1)
                users = await Transaction.find({userAddress: userAddress,type: type,game:"Crypto 8Ball"}).sort({date: -1});
        } else 
        {
            if(game === 1)
                users = await Transaction.find({userAddress: userAddress,type: type,game:"Crypto 8Ball"}).sort({date: 1});
        }
        res.json(users);
    }catch(err) {
        res.status(404).json("find error");
    }
})


module.exports = router;