const mongoose=require('mongoose')



let birthdayDataSchema= new mongoose.Schema({
    name: {
        type:String,
        required:true,
        uppercase: true,
        unique:true

    },
    day:{
        type:Number,
        required:true
       },
    month:{
        type:Number,
        required:true
       },
    year:{
        type:Number,
        required:true
       }  
    
},
{
    timestamps:true
}
)
module.exports=mongoose.model("birthdayPersonInfo",birthdayDataSchema)