const mongoose = require('mongoose');
const BirthdayPersonInfo=require('../models/data.models')

const createfn=async(req,res)=>{
    try{
        //date must be dd/mm/yyyy format
        const data = req.body;
        console.log(data)
        BirthdayPersonInfo.create(data)
        res.status(200).json({ data: data });

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error' });

    }
}

const findfn=async(req,res)=>{
    try{
        const birthdayPersons = await BirthdayPersonInfo.find({},{
            _id:1,
            name:"$name",
            birthdayDate:"$birthdayDate"
        })
        // console.log(birthdayPersons)
        res.status(200).json({ data: birthdayPersons });

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error' });

    }
}

const selectiveFindfn=async(req,res)=>{
    try{
        const reqName=req.params.name
        // console.log(reqName)
        let data=reqName.toUpperCase();   
         const regex = new RegExp(data); // 'i' for case-insensitive match
        // console.log(regex)
        // Find and delete documents matching the name using the regex
        const result = await BirthdayPersonInfo.find({ "name": regex });
        res.status(200).json({ data: result });
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error' });

    }
}

const updatefn=async(req,res)=>{
    try{
    const reqName = req.params.name;
    let data=reqName.toUpperCase();   
    const updatedData = req.body;
    const regex = new RegExp(data); // 'i' for case-insensitive match
    BirthdayPersonInfo.updateOne({"name": regex},{$set: updatedData}, { new: true })
    .then((data)=>{
        res.status(200).json({ data: result });
    })
    .catch((err)=>{
        res.status(500).json({ error: 'Error' });
     } )
    }
    catch(err){
        res.status(500).json({ error: 'Error' });

    }
}

const deletefn=async(req,res)=>{
    try{
    const reqName=req.params.name;
    let data=reqName.toUpperCase();   
    // console.log(name)
    // BirthdayPersonInfo.deleteMany({name:})
    const regex = new RegExp(data); // 'i' for case-insensitive match
    // Find and delete documents matching the name using the regex
    const result = await BirthdayPersonInfo.deleteMany({ "name": regex });
    res.status(200).json({ data: result });
    }
    catch(err){
        res.status(500).json({ error: 'Error' });
    }

}


const apimake=async(req,res)=>{
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
  
    console.log(currentDate)
    // Query the database for birthdays with the same date and month
    const matchingBirthdays = await BirthdayPersonInfo.find({
        $and: [
        { day: currentDay },
        { month: currentMonth }
        ]
    });

    console.log(matchingBirthdays)
}

module.exports={createfn,findfn,selectiveFindfn,updatefn,deletefn,apimake}