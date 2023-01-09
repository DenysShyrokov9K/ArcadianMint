const express = require("express");
const router = express.Router();

const fetch = require("node-fetch");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const AbiCoder = require("web3-eth-abi");

const Transaction = require('../../models/mintTransaction');
const Volume = require('../../models/volume');

// @route   get api/users/test
// @desc    test User
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "this is test" }));

router.post('/getTransactions',async(req,res) => {
  try{
    const {address,game,type,sort} = req.body;
    let transactions;
    if(sort == "pricePlus"){
      transactions = await Transaction.find({userAddress: address,game: game,transferType: type}).sort({amount: -1});
    }

    if(sort == "priceMinus"){
      transactions = await Transaction.find({userAddress: address,game: game,transferType: type}).sort({amount: 1});
    }

    if(sort == "latest"){
      transactions = await Transaction.find({userAddress: address,game: game,transferType: type}).sort({date: -1});
    }

    if(sort == "oldest"){
      transactions = await Transaction.find({userAddress: address,game: game,transferType: type}).sort({date: 1});
    }
    res.json(transactions);
  } catch(err) {
    res.status(404).json("find error");
  }
})

router.get("/getTotalVolume", async (req, res) => {
  try {
    const volumes = await Volume.find();
    let totalVolume = 0;
    if(volumes.length > 0){
      totalVolume = volumes[volumes.length-1].totalVolume;
    } else totalVolume =0;
    res.json(totalVolume);
  } catch (err) {
    res.json(0);
  }
});

//get MainMintedCount
router.get("/getMainMintedCount", async(req, res) => {
  try {
    const volumes = await Volume.find();
    let mainMintedCount = 0;
    if(volumes.length > 0){
      mainMintedCount = volumes[volumes.length-1].mainCount;
    } else mainMintedCount =0;
    res.json(mainMintedCount);
  } catch (err) {
    res.json(0);
  }
});

//get SonicMintedCount
router.get("/getSonicMintedCount", async(req, res) => {
  try {
    const volumes = await Volume.find();
    let sonicMintedCount = 0;
    if(volumes.length > 0){
      sonicMintedCount = volumes[volumes.length-1].sonicCount;
    } else sonicMintedCount =0;
    res.json(sonicMintedCount);
  } catch (err) {
    res.json(0);
  }
});

//get MtopMintedCount
router.get("/getMtopMintedCount", async(req, res) => {
  try {
    const volumes = await Volume.find();
    let mtopMintedCount = 0;
    if(volumes.length > 0){
      mtopMintedCount = volumes[volumes.length-1].mtopCount;
    } else mtopMintedCount =0;
    res.json(mtopMintedCount);
  } catch (err) {
    res.json(0);
  }
});

//get currentAvaxPrice
router.get("/getCurrentAvaxPrice", async (req, res) => {
  try {
    let response;
    await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=AVAX&tsyms=USD&api_key=f7a6a1d6d3ef3ad2eabc8f0ddf13be828741c5e7e65d43c07aa4d1b0321f41d4"
    )
      .then((res) => res.text())
      .then((text) => (response = JSON.parse(text)));
    res.json(response.USD);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
