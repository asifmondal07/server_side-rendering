const express=require("express");
const {handelUserSigbUp,
        handelUserLogin,
    }=require("../controllers/user");


const router=express.Router();

router.post("/",handelUserSigbUp );
router.post("/login",handelUserLogin );

module.exports=router;