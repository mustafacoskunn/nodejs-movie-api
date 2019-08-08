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
        required : Date.now
    }

});

mongoose.model('moview',MovieSchema); // şemayı oluşturduk ve dışarı aktardık.