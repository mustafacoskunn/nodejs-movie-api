const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const MovieSchema=new Schema({ // movie şemamızı oluşturuyoruz

    title:{
        type : String,
        required : true
    },
    category : String,
    country : String,
    year : Number,
    imbd_score : Number,
    director_id : Schema.Types.ObjectId,
    date : {
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model('movie', MovieSchema); // şemayı oluşturduk ve dışarı aktardık.