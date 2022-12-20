const express = require("express");
const router = express.Router();
const IsWhiteList = require("../isWhiteList");

// @route   get api/users/test
// @desc    test User
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "this is test" }));

const deployTime = Date.now();

// @route   POST api/transaction
// @desc    Register User
// @access  Public
router.post("/mintLvl", (req,res) => {
    try{    
        const currentTime = Date.now();
        const { userAddress } = req.body;
        console.log(deployTime);
        console.log(currentTime);
        console.log((currentTime - deployTime) / 36e5);
        console.log(userAddress);
        console.log(IsWhiteList(userAddress));
        // if(IsWhiteList(userAddress) === 1 &&  ((currentTime - deployTime) / 36e5) <= 24){
        //     res.json("whiteList");
        // } else res.json("noWhiteList");
        res.json("noWhiteList");
    } catch(err){
        res.status(404).json("Transaction Error");
    }
});

module.exports = router;