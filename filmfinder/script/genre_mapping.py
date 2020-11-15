import csv
import json
import requests

url = 'https://api.themoviedb.org/3/genre/movie/list'
lang = 'en-US'
api_key = 'a32f475cc38fc86be6398e58d22b946f'  
params = {
    "language": lang,
    'api_key' : api_key
}
r = requests.get(url, params=params)
jsons = json.loads(r.text)
with open("genres.csv", "w") as fw:
    for genre in jsons['genres']:
        writter = csv.DictWriter(fw, delimiter="|", fieldnames=['id', 'name'])
        writter.writerow(genre)