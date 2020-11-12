import json
from requests.api import request
from tqdm import tqdm
import csv
import requests
from multiprocessing import Process


def crawler(start:int, end:int, result_jsons) -> None:
    filename = 'movies_top_' + str(start) + '_' + str(end) + '.csv'
    result_jsons = result_jsons[start:end]
    with open(filename, "w", newline='', encoding='UTF-8') as csvfile:
        fieldname = ['tmdb_id', 'title', 'description', 'poster', 'popularity', 'genres', 'rating', 'rating_count', 'release_date', 'director']
        csv_writter = csv.DictWriter(csvfile, fieldnames=fieldname)
        api_key = 'a32f475cc38fc86be6398e58d22b946f'
        url = 'https://api.themoviedb.org/3/movie/'
        param = {'api_key': api_key, 'language': 'en-US'}
        credit_param = {'api_key': api_key}
        for i, item in enumerate(tqdm(result_jsons)):
            if (i == 0):
                csv_writter.writeheader()
            request_url = url+str(item['id'])
            credit_url = request_url + '/credits'
            r = requests.get(request_url, params=param)
            rc = requests.get(credit_url, params=credit_param)
            result = json.loads(r.text)
            credit = json.loads(rc.text)
            try:
                director = None 
                for crew in credit['crew']:
                    if (crew['job'] == "Director"):
                        director = crew['id']
                data_movie = {
                    'tmdb_id': result['id'],
                    'title': result['title'],
                    'description': result['overview'],
                    'poster': result['poster_path'],
                    'popularity': result['popularity'],
                    'genres': result['genres'],
                    'rating': result['vote_average'],
                    'rating_count': result['vote_count'],
                    'release_date': result['release_date'], 
                    'director': director
                }
                csv_writter.writerow(data_movie)
            except:
                print(item)

if __name__ == '__main__':
    filename = "movie_ids_11_09_2020.json"
    raw_json = {}
    result_jsons = []
    print(filename)
    with open(filename, "r", encoding='UTF-8') as fr:
        for i, line in enumerate(tqdm(fr, total=556140)):
            raw_json = json.loads(line)
            result_jsons.append(raw_json)
    result_jsons = sorted(result_jsons, key=lambda i: i['popularity'], reverse=True)
    # fw = open("sorted_movie.json", "w", encoding='UTF-8')
    # json.dumps(raw_json, fw, sort_keys="popularity")
    p1 = Process(target=crawler, args=[25000, 29999, result_jsons])
    p2 = Process(target=crawler, args=[30000, 34999, result_jsons])
    p3 = Process(target=crawler, args=[35000,39999, result_jsons])
    p4 = Process(target=crawler, args=[40000,44999, result_jsons])
    p5 = Process(target=crawler, args=[45000,49999, result_jsons])
    p1.start()
    p2.start()
    p3.start()
    p4.start()
    p5.start()
    p1.join()
    p2.join()
    p3.join()
    p4.join()
    p5.join()