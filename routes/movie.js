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
//top10 list endpoint
router.get('/top10',(req,res)=>{
  const promise=Movie.find({}).limit(10).sort({imbd_score:-1}); //burda sıralamasını yapıoyruz bir nevi sorgu -1 büyükten küçüge dogru sıralıyor
  promise.then((data)=>{

    res.json(data);

  }).catch((err)=>{
    res.json(err);
  });

});

//iki tarih arasındaki filmleri listeleme

router.get('/between/:start_year/:end_year',(req,res)=>{

  const {start_year,end_year}=req.params;
  const promise=Movie.find(
      {
        year:{"$gte":parseInt(start_year) ,"$lte":parseInt(end_year)}//gte:büyük veya eşit lte:küçük veya eşit
      }
  );
  promise.then((data)=>{

    res.json(data);

  }).catch((err)=>{
    res.json(err);
  });

});


//film idsine göre filmlerin json olarak dönmesi
  router.get('/:movie_id', (req, res, next) => {
    //  res.send(req.params); //'/:movie:id deki deger ne ise req.params'a düşer(yani burdaki parametre neyse req.paramsa düşşer)

    const promise = Movie.findById(req.params.movie_id);//burada mongodbde sorgu yapıyoruz idye eşitse tarzı

    promise.then((movie) => {
    if (!movie)
      next({ message: 'Film Bulunamadı.', code: 99 });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

//Film Güncelleme idye göre
router.put('/:movie_id', (req, res, next) => {
  //  res.send(req.params); //'/:movie:id deki deger ne ise req.params'a düşer(yani burdaki parametre neyse req.paramsa düşşer)

  const promise = Movie.findByIdAndUpdate(//burada mongodbde sorgu yapıyoruz idye eşitse tarzı
      req.params.movie_id,
      req.body,//yeni gelicek datanın bodysi
      {
        new : true //güncellenen veri dönsün diye eger bunu yapmassak dönüş eski veri oluyor
      }
  );
  promise.then((movie) => {
    if (!movie)
      next({ message: 'Film Bulunamadı.', code: 98 });

    res.json({status : 1}); //status :1 daha mantıklı movie yazarsak direk degerler gelicek
  }).catch((err) => {
    res.json(err);
  });
});


//
router.delete('/:movie_id', (req, res, next) => {
  //  res.send(req.params); //'/:movie:id deki deger ne ise req.params'a düşer(yani burdaki parametre neyse req.paramsa düşşer)

  const promise = Movie.findByIdAndRemove(req.params.movie_id);//burada mongodbde sorgu yapıyoruz idye eşitse tarzı

  promise.then((movie) => {
    if (!movie)
      next({ message: 'Film Silinemedi.', code: 97 });

    res.json({status: 1});
  }).catch((err) => {
    res.json(err);
  });
});




module.exports = router;
