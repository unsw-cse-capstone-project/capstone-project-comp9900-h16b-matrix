import json
import requests
import mysql.connector

mc = mysql.connector.connect(user='charles', password='wqypoiu1995', database='filmfinder', host="127.0.0.1", port="3307")
filename = ""