const express = require('express');
const mongoose=require('mongoose');
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
//tek bir yonetmeni filmleri ile beraber göstermek için
router.get('/:directory_id', (req, res, next)=> {

  const promise=Director.aggregate([ //join yapcagımız için aggregate kullanıyoruz
    {
      $match:{ // ide göre listele bir nevi sorgu
        '_id': mongoose.Types.ObjectId(req.params.directory_id) //'_id' fieldındaki ve girilen id eşit olanı getir
      },
    },
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
//yonetmen put
router.put('/:directory_id', (req, res, next) => {
  //  res.send(req.params); //'/:directory_iddeki deger ne ise req.params'a düşer(yani burdaki parametre neyse req.paramsa düşşer)

  const promise = Director.findByIdAndUpdate(//burada mongodbde sorgu yapıyoruz idye eşitse tarzı
      req.params.directory_id,
      req.body,//yeni gelicek datanın bodysi
      {
        new : true //güncellenen veri dönsün diye eger bunu yapmassak dönüş eski veri oluyor
      }
  );
  promise.then((director) => {
    if (!director)
      next({ message: 'director Bulunamadı.', code: 98 });

    res.json({status : 1}); //status :1 daha mantıklı movie yazarsak direk degerler gelicek
  }).catch((err) => {
    res.json(err);
  });

});




module.exports = router;
