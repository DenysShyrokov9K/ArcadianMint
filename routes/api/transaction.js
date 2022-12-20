const express = require("express");
const router = express.Router();
const Transaction = require('../../models/Transaction');
const SaveTransaction = require('../save');
const fetch = require('node-fetch');
// @route   get api/users/test
// @desc    test User
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "this is test" }));

let totalVolume  = 112;
let mainMintedCount = 70;
let sonicMintedCount = 15;
let mtopMintedCount = 4;

// @route   POST api/transaction
// @desc    Register User
// @access  Public
router.post("/", (req,res) => {
    try{    
        res.json("success");
        totalVolume += req.body.amount;
        if(req.body.collectionId === 1){
            mainMintedCount++;
        }
        if(req.body.collectionId === 3){
            sonicMintedCount++;
        }
        if(req.body.collectionId === 4){
            mtopMintedCount++;
        }
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
        } 
        if(sort === "oldest") 
        {
            if(game === 1)
                users = await Transaction.find({userAddress: userAddress,type: type,game:"Crypto 8Ball"}).sort({date: 1});
        }
        if(sort === "priceMinus"){
            if(game === 1){
                users = await Transaction.find({userAddress: userAddress,type: type,game:"Crypto 8Ball"}).sort({amount: -1});
            }
        }
        if(sort === "pricePlus"){
            if(game === 1){
                users = await Transaction.find({userAddress: userAddress,type: type,game:"Crypto 8Ball"}).sort({amount: 1});
            }
        }
        res.json(users);
    }catch(err) {
        res.status(404).json("find error");
    }
})

//get TotalVolume
router.get('/getTotalVolume',(req,res) => {
    try{
        res.json(totalVolume);
    }catch(err) {
        res.json(totalVolume);
    }
})

//get MainMintedCount
router.get('/getMainMintedCount',(req,res) => {
    try{
        console,log(mainMintedCount);
        res.json(mainMintedCount);
    }catch(err) {
        res.json(mainMintedCount);
    }
})

//get SonicMintedCount
router.get('/getSonicMintedCount',(req,res) => {
    try{
        res.json(sonicMintedCount);
    }catch(err) {
        res.json(sonicMintedCount);
    }
})

//get MtopMintedCount
router.get('/getMtopMintedCount',(req,res) => {
    try{
        res.json(mtopMintedCount);
    }catch(err) {
        res.json(mtopMintedCount);
    }
})

//get currentAvaxPrice
router.get('/getCurrentAvaxPrice',async (req,res) => {
    try{
        console.log("getCurrentAvaxPrice");
        let response;
        await fetch('https://min-api.cryptocompare.com/data/price?fsym=AVAX&tsyms=USD&api_key=f7a6a1d6d3ef3ad2eabc8f0ddf13be828741c5e7e65d43c07aa4d1b0321f41d4')
            .then(res => res.text())
            .then(text => response = JSON.parse(text));
        res.json(response.USD);
    
    }catch(err){
        console.log(err);
    }
})


module.exports = router;