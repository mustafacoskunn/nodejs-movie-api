const express = require('express');
const router = express.Router();


//models import ediyoruz
const Director=require('../Models/Director');
//yeni yönetmen ekle
router.post('/', (req, res, next)=> {
  const director=new Director(req.body);
  const promise=director.save();

  promise.then((data)=>{
    res.json(data);


  }).catch((err)=>{
    res.json(err);
  });

});
//tum yonetmenleri filmleri ile beraber göstermek için
router.get('/', (req, res, next)=> {

  const promise=Director.aggregate([ //join yapcagımız için aggregate kullanıyoruz
    {
      $lookup:{
        from: 'movies', //nereis ile join olucak
        localField: '_id', //director tablosundaki ne ile eşleşicek
        foreignField: 'director_id',//movie tablosundaki ne ile birleşcek
        as: 'movies' //hangi degişkene atanacak unwind kısmında bu değişkeni alıcagız

      }
    },
    {
      $unwind:{
        path: '$movies', //as: deki moviesi alıyoruz
        preserveNullAndEmptyArrays: true //bunu true yapmassak sadece filmi olan yönetmenler gelir o yüzden true yapıyoruz

      }
    },
    {
      $group:{ //şimdi yönetmenin 2 3 tane filmi olsa bile ayrı ayrı gösteriyor onları gruplamak için
        _id: {
          _id:'$id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies:{
          $push: '$movies'
        }
      }
    },
    {
      $project:{ //_id şeklinde gösteriyordu yönetmenleri onu düzenledik
        _id: '$_id._id',
        name : '$_id.name',
        surname : '$_id.surname',
        bio : '$_id.bio',
        movies: '$movies'
      }
    }


  ]);


  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });

});






module.exports = router;
