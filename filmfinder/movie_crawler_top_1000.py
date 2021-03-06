import json
from requests.api import request
from tqdm import tqdm
import csv
import requests
from multiprocessing import Process


def crawler(start:int, end:int, result_jsons) -> None:
    filename = 'movies_top_' + str(start) + '_' + str(end) + '.csv'
    genre_file = 'genre_of_movie_' + str(start) + '_' + str(end)+ '.csv'
    result_jsons = result_jsons[start:end]
    with open(filename, "w", newline='', encoding='UTF-8') as csvfile:
        with open(genre_file, "w", newline='', encoding='UTF-8') as genre_csv:
            fieldname = ['id', 'title', 'description', 'poster', 'popularity', 'genres', 'rating', 'rating_count', 'release_date', 'director']
            genre_fields=['movie_id', 'genre_id']
            csv_writter = csv.DictWriter(csvfile, fieldnames=fieldname, delimiter="|", quoting=csv.QUOTE_MINIMAL)
            genre_writter = csv.DictWriter(genre_csv, fieldnames=genre_fields, delimiter='|')
            
            api_key = 'a32f475cc38fc86be6398e58d22b946f'
            url = 'https://api.themoviedb.org/3/movie/'
            param = {'api_key': api_key, 'language': 'en-US', 'append_to_response': 'credits'}
            for i, item in enumerate(tqdm(result_jsons)):
                if (i == 0):
                    csv_writter.writeheader()
                request_url = url+str(item['id'])
                r = requests.get(request_url, params=param)

                result = json.loads(r.text)
                try:
                    crew = result['credits']['crew']
                except:
                    crew = None
                try:
                    director = None
                    if crew != None:
                        for p in crew:
                            if (p['job'] == "Director"):
                                director = p['id']
                    genres = result['genres']
                    if genres != None:
                        for item in genres:
                            data_genre = {
                                'movie_id': result['id'],
                                'genre_id': item['id']
                            }
                            genre_writter.writerow(data_genre)
                    data_movie = {
                        'id': result['id'],
                        'title': result['title'],
                        'description': result['overview'],
                        'poster': result['poster_path'],
                        'popularity': result['popularity'],
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
    p1 = Process(target=crawler, args=[0, 9999, result_jsons])
    p2 = Process(target=crawler, args=[10000, 19999, result_jsons])
    p3 = Process(target=crawler, args=[20000,29999, result_jsons])
    p4 = Process(target=crawler, args=[30000,39999, result_jsons])
    p5 = Process(target=crawler, args=[40000,49999, result_jsons])
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