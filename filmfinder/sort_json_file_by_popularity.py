import json
from tqdm import tqdm
import csv
import requests
filename = "movie_ids_11_09_2020.json"
raw_json = {}
result_jsons = []
print(filename)
with open(filename, "r", encoding='UTF-8') as fr:
    for i, line in enumerate(tqdm(fr, total=556140)):
        raw_json = json.loads(line)
        result_jsons.append(raw_json)
print(len(result_jsons))
result_jsons = sorted(result_jsons, key=lambda i: i['popularity'], reverse=True)[:10000]
# fw = open("sorted_movie.json", "w", encoding='UTF-8')
# json.dumps(raw_json, fw, sort_keys="popularity")
with open('movies.csv', "w", newline='', encoding='UTF-8') as csvfile:
    fieldname = ['tmdb_id', 'title', 'description', 'poster', 'popularity', 'genres', 'rating', 'rating_count', 'release_date']
    csv_writter = csv.DictWriter(csvfile, fieldnames=fieldname)
    url = 'https://api.themoviedb.org/3/movie/'
    param = {'api_key': 'a32f475cc38fc86be6398e58d22b946f', 'language': 'en-US'}
    for i, item in enumerate(tqdm(result_jsons)):
        if (i == 0):
            csv_writter.writeheader()
        request_url = url+str(item['id'])
        r = requests.get(request_url, params=param)
        result = json.loads(r.text)
        data_movie = {
            'tmdb_id': result['id'],
            'title': result['title'],
            'description': result['overview'],
            'poster': result['poster_path'],
            'popularity': result['popularity'],
            'genres': result['genres'],
            'rating': result['vote_average'],
            'rating_count': result['vote_count'],
            'release_date': result['release_date'] 
        }
        csv_writter.writerow(data_movie)
        print("df")