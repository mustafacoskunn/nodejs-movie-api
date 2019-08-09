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

module.exports = router;
