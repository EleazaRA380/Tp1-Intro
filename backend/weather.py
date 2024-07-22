from flask import Flask, request, jsonify
from urllib.parse import unquote # Funcion Unquote reemplaza %xx escapes con su equivalente de un solo carácter (vacio("")).
from flask_cors import CORS 
import json
import requests
import os
app = Flask(__name__)
CORS(app)
@app.route("/weather/<string:city_name>-<string:state_name>-<string:country_name>")
def get_weather(city_name,state_name,country_name):    
    url_weather= "https://api.openweathermap.org/data/2.5/weather" 
    url_geolocalizator="http://api.openweathermap.org/geo/1.0/direct"
    api_key=os.getenv('OPENWEATHERMAP_API_KEY')

    limit=1
    location=None
    iso_state_code=None   
    with open("us_states_ISO2.json", "r") as us_data_2:
            states_file_2=json.load(us_data_2)
            for indice in range(len(states_file_2)):
                if((states_file_2[indice]["state_en"]==unquote(state_name)) or (states_file_2[indice]["state_es"]==unquote(state_name))): #Si el valor de la clave nameEs o nameEN  en el indice X es igual "country", entonces.
                    iso_state_code=states_file_2[indice]["iso"]
                    location=f"{unquote(city_name)},{iso_state_code}"   
                else:
                    location=f"{unquote(city_name)},{unquote(state_name)}"
    with open("countries_ISO.json", "r") as data_country:   #Abrimos el archivo .json en modo lectura
        countries_file=json.load(data_country)  #guardamos el archivo. 
        for indice in range(len(countries_file)):   #Iteramos para elemento de la lista del archivo "countries_ISO.json".
            if((countries_file[indice]["nameES"]==unquote(country_name)) or (countries_file[indice]["nameEN"]==unquote(country_name))):   #Si el valor de la clave nameEs o nameEN  en el indice X es igual "country", entonces.
                iso_country_code=countries_file[indice]["iso2"]     #guardamos el valor de la clave "iso2" (codigo del pais ISO) encontrado en el indice X. 
                if(iso_state_code==None):
                    location=f"{unquote(city_name)},{unquote(state_name)},{iso_country_code}"
                else:
                    location=f"{unquote(city_name)},{iso_state_code},{iso_country_code}"
    geografic_params={
        "q":location,
        "limit":limit,
        "appid":api_key
    }
    response_coordinates=requests.get(url_geolocalizator,params=geografic_params)
    coordinates=response_coordinates.json()
    weather=[]
    if(response_coordinates.status_code==200 and len(coordinates)>0):
        lat=coordinates[0]["lat"]
        lon=coordinates[0]["lon"]
        country=coordinates[0]["country"]
        state=None
        if("state" in coordinates[0]):
            state=coordinates[0]["state"]
        weather_params={
            "lat":lat,
            "lon":lon,
            "appid":api_key,
            "units":"metric"
        }
        response_weather=requests.get(url_weather, params=weather_params).json()
        weather.append(response_weather)
        with open("countries_ISO.json") as data_country:
            countries_file=json.load(data_country) #guardamos el archivo. 
            for indice in range(len(countries_file)):
                if(countries_file[indice]["iso2"]==country): #Si el valor de la clave "iso2" es igual a country. 
                    country_ES=countries_file[indice]["nameES"]
                    country_EN=countries_file[indice]["nameEN"]
                    if(state==None):
                        new_dictionary={"country_ES":country_ES,"country_EN":country_EN}
                        weather.append(new_dictionary)
                    else:
                        new_dictionary={"state":state,"country_ES":country_ES,"country_EN":country_EN}
                        weather.append(new_dictionary)
    elif not coordinates:
        new_dictionary={"location":"Not Found","Valid":"False"}
        weather.append(new_dictionary)
    else:
        weather.append(coordinates)
    return jsonify(weather)

if __name__ == '__main__':
    app.run(debug=True)
