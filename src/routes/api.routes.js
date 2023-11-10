const express=require("express");
const apicontrol= require("../controllers/crud.controller");

const router=express.Router()

router.get('/birthdayPersonInfo',apicontrol.findfn)
router.get('/birthdayPersonInfo/:name',apicontrol.selectiveFindfn)

router.post('/birthdayPersonInfo',apicontrol.createfn)
router.put('/birthdayPersonInfo/:name',apicontrol.updatefn)
router.delete('/birthdayPersonInfo/:name',apicontrol.deletefn)
router.get("/apitest",apicontrol.apimake)

module.exports=router;