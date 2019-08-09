| route | istek	 | geri dönüş	 | açıklama	 |
| --- | --- | --- | --- |
| /api/movies/ | `GET` | Status Code| Bütün filmleri listele. |
| /api/movies/ | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7 } | Yeni film. |
| /api/movies | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7 } | yeni film. |
| /api/movies/:movie_id | `GET` | Status Code| Film idsine göre filmleri getir. |
| /api/movies/:movie_id | `PUT` | {'name':'foo', 'surname':'bar'} | Güncelleme id'ye göre. |
| /api/movies/:movie_id | `DELETE` | Status Code| Filmi sil. |

| route | istek	 | geri dönüş	 | açıklama	 |
| --- | --- | --- | --- |
| /api/directors | `GET` | Status Code| Bütün yönetmenleri listele. |
| /api/directors | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7 } | Yeni yönetmen. 
| /api/directors/:director_id | `GET` | |yönetmen listele. |
| /api/directors/:director_id| `PUT` | {'name':'foo', 'surname':'bar'} | Güncelleme id'ye göre. |
| /api/directors/:director_id| `DELETE` | {'name':'foo', 'surname':'bar'} | Güncelleme id'ye göre. |



