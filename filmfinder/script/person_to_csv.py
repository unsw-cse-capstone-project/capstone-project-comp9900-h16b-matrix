import json
import requests
import mysql.connector
import os.path
from tqdm import tqdm
mc = mysql.connector.connect(user='charles', password='wqypoiu1995', database='filmfinder', host="127.0.0.1", port="3307")
cursor = mc.cursor()
filename = "/../person_ids_10_11_2020.json"
fr = open(os.path.dirname(__file__) + filename, encoding='UTF-8')
for i, line in enumerate(tqdm(fr, total=1771672)):
    item = json.loads(line)
    sql = "INSERT INTO person (tmdb_id, name) VALUES (%s, %s)"
    val = (item['id'], item['name'])
    cursor.execute(sql, val)
fr.close()
mc.commit()

