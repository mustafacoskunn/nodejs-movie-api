| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/movies/ | `GET` | Status Code| B�t�n filmleri listele. |
| /api/movies/ | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7 } | Yeni film. |
| /api/movies | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7 } | yeni film. |
| /api/movies/:movie_id | `GET` | Status Code| Film idsine g�re filmleri getir. |
| /api/movies/:movie_id | `PUT` | {'name':'foo', 'surname':'bar'} | G�ncelleme id'ye g�re. |
| /api/movies/:movie_id | `DELETE` | Status Code| Filmi sil. |