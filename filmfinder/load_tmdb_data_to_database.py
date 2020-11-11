from os import name
import requests
import json
import mysql.connector
from tqdm import tqdm

crx = mysql.connector.connect(user="charles", password="wqypoiu1995", host="127.0.0.1", database="filmfinder", port=3307)
cursor = crx.cursor()


url = 'https://api.themoviedb.org/3/movie/'
param = {'api_key': 'a32f475cc38fc86be6398e58d22b946f', 'language': 'en-US'}

# add_movie = ("INSERT INTO movie"
#              "(tmdb_id, title, description, poster, n_hits)"
#              "VALUES (%(tmdb_id)s, %(title)s, %(description)s, %(poster)s, 0)")

result_json = {}
num_lines = sum(1 for line in open('movie_ids_11_09_2020.json','r', encoding='utf-8'))
with open('movie_ids_11_09_2020.json', encoding='utf-8') as f:
    with open('movie_data.json', 'w') as fw:
        for i, line in enumerate(tqdm(f, total=num_lines)):
            movie_json = json.loads(line)
            request_url = url+str(movie_json['id'])
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
            # result_json.update(data_movie)
            json.dump(data_movie, fw)
            # fw.write('\n')
            # if i == 100:
            #     break

# crx.close()