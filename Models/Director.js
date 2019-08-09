const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const DirectorSchema=new Schema({ // director şemamızı oluşturuyoruz
    name : String,
    surname : String,
    bio : String,
    createAd : {
        type : Date,
        default : Date.now()
    }

});

module.exports = mongoose.model('director', DirectorSchema); // şemayı oluşturduk ve dışarı aktardık.