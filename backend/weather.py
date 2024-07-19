from flask import Flask, request, jsonify
from urllib.parse import unquote #Replace %xx escapes by their single-character equivalent.
import json
import requests
app = Flask(__name__)

@app.route("/weather", methods=["POST"])
def get_weather():    
    url_weather= "https://api.openweathermap.org/data/2.5/weather" 
    url_geolocalizator="http://api.openweathermap.org/geo/1.0/direct"
    city_name=unquote(request.json.get("city"))
    api_key="b7befde37d3eb977bb9a8f48e7de1c75"
    limit=5
    location=f"{city_name}"
    if("state" in request.json):
        us_x=False
        state_name=unquote(request.json.get("state"))     
        with open("us_states_ISO2.json", "r") as us_data_2:
            states_file_2=json.load(us_data_2)
            for indice in range(len(states_file_2)):
                if((states_file_2[indice]["state_en"]==state_name) or (states_file_2[indice]["state_es"]==state_name)): #Si el valor de la clave nameEs o nameEN  en el indice X es igual "country", entonces.
                    iso_state_code=states_file_2[indice]["iso"]
                    location=f"{city_name},{iso_state_code}" 
                    us_x=True    
        if(us_x!=True):
            location=f"{city_name},{state_name}"
    if("country" in request.json): 
        country_name=unquote(request.json.get("country")) #guardas el nombre del pais.
        with open("countries_ISO.json", "r") as data_country:  #Abrimos el archivo .json en modo lectura
            countries_file=json.load(data_country) #guardamos el archivo. 
            for indice in range(len(countries_file)): #Iteramos para elemento de la lista del archivo "countries_ISO.json".
                if((countries_file[indice]["nameES"]==country_name) or (countries_file[indice]["nameEN"]==country_name)): #Si el valor de la clave nameEs o nameEN  en el indice X es igual "country", entonces.
                    iso_country_code=countries_file[indice]["iso2"] #guardamos el valor de la clave "iso2" (codigo del pais ISO) encontrado en el indice X. 
                    location=f"{city_name},{state_name},{iso_country_code}"
    geografic_structure={
        "q":location,
        "limit":limit,
        "appid":api_key
    }
    response=requests.get(url_geolocalizator,params=geografic_structure)
    response_coordinates=response.json()
    retorno=[]
    if(response.status_code==200):
        for indice in range(len(response_coordinates)):
            lat=response_coordinates[indice]["lat"]
            lon=response_coordinates[indice]["lon"]
            weather={
                "lat":lat,
                "lon":lon,
                "appid":api_key,
                "units":"metric"
            }
            response_weather=requests.get(url_weather, params=weather)
            retorno.append(response_weather.json())
    else:
        retorno.append(response.json())
    return jsonify(retorno)

if __name__ == '__main__':
    app.run(debug=True)