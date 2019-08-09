const mongoose=require('mongoose');

module.exports=()=>{
   mongoose.connect('mongodb://movie_user:123456a@ds213615.mlab.com:13615/movie-api',{ useNewUrlParser: true });
   mongoose.connection.on('open',()=>[
       console.log('MongoDB Baglantısı Başarılı.')
   ]);
    mongoose.connection.on('error',(err)=>[
        console.log('MongoDB Baglantısı Başarısız.',err)
    ]);
    mongoose.Promise=global.Promise;

};