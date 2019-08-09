const express = require('express');
const router = express.Router();


//models import ediyoruz
const Movie=require('../Models/Movie');

router.post('/', (req, res, next)=> {
  //const {title,category,country,year,imbd_score}=req.body;

  /*const movie=new Movie({ //nesne ürettik
    title: title,
    imbd_score: imbd_score,
    category: category,
    country: country,
    year: year
  });*/ //veriyi istersek bu kapalı kodlar gibide gönderebiliriz

  const movie=new Movie(req.body); //veya böyle tek satırda halledebiliriz
  /*movie.save((err,data)=>{ //gelen datayı veritabanına kaydet
    if(err)
      res.json(err);

    res.json({status:1});
  });*/ //daha temiz bir yöntemi var


  const promise=movie.save();
  promise.then((data)=>{
    res.json({status: 1}); //en son databaseye yazılan veriyi döndürür
  }).catch((err)=>{
    res.json(err);
  });

});

//filmleri listele

router.get('/',(req,res)=>{
   const promise=Movie.find({});
   promise.then((data)=>{

     res.json(data);

   }).catch((err)=>{
     res.json(err);
   });



});
//film idsine göre filmlerin json olarak dönmesi
router.get('/:movie_id',(req,res)=>{
  //  res.send(req.params); //'/:movie:id deki deger ne ise req.params'a düşer(yani burdaki parametre neyse req.paramsa düşşer)
  const promise = Movie.findById(req.params.movie_id); //burada mongodbde sorgu yapıyoruz idye eşitse tarzı bişey

  promise.then((movie)=>{
    res.json(movie);

  }).catch((err)=>{
    res.json(err);
  });


});

module.exports = router;
