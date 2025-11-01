from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.requests import Request
import requests
import os
from typing import Optional

# Crear la instancia de FastAPI para la app
app = FastAPI(title="ClimApp", version="1.0.0")

# Montar archivos estáticos (css, js)
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# Configurar templates (html)
templates = Jinja2Templates(directory="frontend/templates")

# Configuración de la API de clima (OpenWeatherMap)

"""Cabe aclarar que hay que registrarse en la app de OpenWeather
   Para poder tener un API Key."""

# Tu llave personal de API
API_KEY = os.getenv("WEATHER_API_KEY", "0355ce307094076438353871e7887614")

# URL para consumo de la API - USAR VERSIÓN 2.5 GRATUITA
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

# Página principal de la app FastAPI
@app.get("/", response_class=HTMLResponse)
async def inicio(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Ruta para hacer la petición del clima
@app.get("/api/weather")
async def obtenerClima(ciudad: str = Query(..., description="Nombre de la ciudad")):
    try:
        # Hacer petición a la API de clima
        parametros = {
            'q': ciudad,
            'appid': API_KEY,
            'units': 'metric', # Muestra el clima en Celcius
            'lang': 'es' # Coloca la respuesta en español
        }

        # Rectificación de búsqueda
        print(f"Buscando clima para: {ciudad}")
        
        # Respuesta de la petición
        response = requests.get(BASE_URL, params=parametros)

        print(f"Status code: {response.status_code}")
        
        # Si la respuesta no es "OK", levanta una exepción
        if response.status_code != 200:
            error = response.json()
            mensaje = error.get('message', 'Error desconocido')
            
            # Caso en que no encuentre la ciudad
            if response.status_code == 404:
                raise HTTPException(404, f"Ciudad no encontrada: {mensaje}")
            
            # Caso en el que la llave API del usuario no sea válida
            elif response.status_code == 401:
                raise HTTPException(401, "API key inválida")
            
            # Caso en que haya un error con la API
            else:
                raise HTTPException(response.status_code, f"Error en la API: {mensaje}")

        # Convierte la petición a JSON
        data = response.json()
        
        # Procesar y formatear los datos
        dataClima = {
            'ciudad': data['name'], # Ciudad
            'pais': data['sys']['country'], # País
            'temperatura': data['main']['temp'], # Temperatura
            'sensacion_termica': data['main']['feels_like'], # Sensación térmica
            'humedad': data['main']['humidity'], # Humedad
            'presion': data['main']['pressure'], # Presión atmosférica
            'velocidad_viento': data['wind']['speed'], # Velocidad del viento
            'descripcion': data['weather'][0]['description'], # Descripción
            'icono': data['weather'][0]['icon'] # ícono
        }
        
        return dataClima
    
    # Excepciones en caso de un error de servidor o de conexión con la API
    except requests.exceptions.RequestException:
        raise HTTPException(500, "Error al conectar con la API del clima")
    except KeyError:
        raise HTTPException(500, "Error al procesar los datos del clima")
    except Exception:
        raise HTTPException(500, "Error inesperado del servidor")