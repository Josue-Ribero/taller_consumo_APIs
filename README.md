<div align="center">
  <h1>🌤️ ClimApp</h1>
  <p><em>Josué Ribero Duarte - 67001295</em></p>
  <p>
  Este proyecto es una app desarrollada en FastAPI que consume una API pública de clima brindada por OpenWeather. 
  
  Permite buscar la ciudad deseada y con ello obtener la información metereológica de ese lugar: temperatura, sensación térmica, presión atmosférica, velocidad del viento y estado del clima.
  </p>

  [![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](https://github.com/tu-usuario/meraki/releases)
  [![FastAPI](https://img.shields.io/badge/FastAPI-v0.118.3-green.svg)](https://github.com/tu-usuario/meraki/releases)
  [![Python](https://img.shields.io/badge/Python-3.13.5-yellow.svg)](https://github.com/tu-usuario/meraki/releases)

</div>

## Estructura del Proyecto

El proyecto se organiza lógicamente por responsabilidades:

```
backend/
│
├── 📄 main.py                          # Aplicación principal FastAPI
├── 📄 __init__.py                      # Archivo de dependencias del main
│
│
frontend/
├── 📂 templates/                       # Plantillas del proyecto
│   └── 📄 index.html                   # Archivo HTML
│
├── 📂 static/                          # Estilos y funcionalidad
│   ├── 📂 css/
│   │   └── 📄 styles.css               # Archivo de estilos de la app
│   └── 📂 js/
│       └── 📄 script.js                # Archivo de funcionalidad de la app
│
├── 📄 requirements.txt                 # Requerimientos del proyecto
├── 📄 README.md                        # Descripción del proyecto
```

***

## Cómo Empezar 🚀

### Requisitos Previos
* Tener **Git** instalado y configurado en tu sistema.
* Tener **Python 3.8+** instalado.

### Pasos de Instalación y Ejecución

1.  **Clonar el repositorio:**
    Abre tu terminal y ejecuta el comando:
    ```bash
    git clone https://github.com/Josue-Ribero/taller_consumo_APIs.git
    ```

2.  **Crear un entorno virtual:**
    El comando que debes ejecutar es:
    ```bash
    python3 -m venv entorno # En Mac/Linux
    python -m venv entorno # En Windows
    ```

3.  **Activar entorno virtual:**
    El comando que debes ejecutar es:
    ```bash
    source entorno/bin/activate # En Mac/Linux
    entorno\Scripts\activate # En Windows
    ```

4.  **Instalar dependencias** (El `requirements.txt` contiene `fastapi`, `uvicorn`, `sqlmodel`, etc.).
    El comando que debes ejecutar es:
    ```bash
    pip install -r requirements.txt
    ```


5.  **Ejecutar el servidor**:
    Este es el comando que debes usar para iniciar la aplicación:
    ```bash
    fastapi dev
    ```

7.  Accede a la página principal de la App: **http://127.0.0.1:8000/**