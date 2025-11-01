// Aplicación del Clima
class AplicacionClima {
    constructor() {
        this.inicializarAplicacion();
    }

    // Método para inicializar la app
    inicializarAplicacion() {
        this.registrarManejadoresEventos();
        this.mostrarMensajeBienvenida();
    }

    // Método para gestionar el registro en el formulario
    registrarManejadoresEventos() {
        const formulario = document.getElementById('formularioClima');
        formulario.addEventListener('submit', (evento) => this.manejarBusqueda(evento));

        const entradaCiudad = document.getElementById('entradaCiudad');
        entradaCiudad.addEventListener('keypress', (evento) => {
            if (evento.key === 'Enter') {
                this.manejarBusqueda(evento);
            }
        });
    }

    // Método para buscar la ciudad
    async manejarBusqueda(evento) {
        evento.preventDefault();

        const ciudad = document.getElementById('entradaCiudad').value.trim();
        if (!ciudad) {
            this.mostrarError('Por favor, ingresa el nombre de una ciudad');
            return;
        }

        await this.obtenerDatosClima(ciudad);
    }

    // Método para obtener los datos de la ciudad buscada con la API de OpenWeather
    async obtenerDatosClima(ciudad) {
        this.mostrarCargando();
        this.ocultarError();
        this.ocultarTarjetaClima();

        try {
            const respuesta = await fetch(`/api/weather?ciudad=${encodeURIComponent(ciudad)}`);

            if (!respuesta.ok) {
                const datosError = await respuesta.json();
                throw new Error(datosError.detail || 'Error al obtener los datos del clima');
            }

            const datosClima = await respuesta.json();
            this.mostrarDatosClima(datosClima);

        } catch (error) {
            this.mostrarError(this.obtenerMensajeError(error));
        } finally {
            this.ocultarCargando();
        }
    }

    // Método para mostrar las estadísticas de la ciudad que la API proporcionó
    mostrarDatosClima(datos) {
        // Mostrar ciudad y país juntos
        document.getElementById('nombreCiudad').textContent = `${datos.ciudad}, ${datos.pais}`;
        document.getElementById('temperatura').textContent = `${Math.round(datos.temperatura)}°C`;
        document.getElementById('descripcionClima').textContent = datos.descripcion;
        document.getElementById('sensacionTermica').textContent = `${Math.round(datos.sensacion_termica)}°C`;
        document.getElementById('humedad').textContent = `${datos.humedad}%`;
        document.getElementById('presion').textContent = `${datos.presion} hPa`;
        document.getElementById('velocidadViento').textContent = `${datos.velocidad_viento} m/s`;

        this.mostrarTarjetaClima();
    }

    // Método para manejar errores de conexión, ciudad que no existe o un por defecto
    obtenerMensajeError(error) {
        const mensajesError = {
            'NetworkError': 'Error de conexión. Verifica tu internet.',
            'Ciudad no encontrada': 'La ciudad no fue encontrada. Verifica el nombre.',
            'default': 'Ocurrió un error inesperado. Intenta nuevamente.'
        };

        return mensajesError[error.message] || error.message || mensajesError['default'];
    }

    // Métodos para mostrar/ocultar elementos
    mostrarCargando() {
        document.getElementById('cargando').classList.add('activo');
    }

    ocultarCargando() {
        document.getElementById('cargando').classList.remove('activo');
    }

    mostrarTarjetaClima() {
        document.getElementById('tarjetaClima').classList.add('activa');
    }

    ocultarTarjetaClima() {
        document.getElementById('tarjetaClima').classList.remove('activa');
    }

    mostrarError(mensaje) {
        document.getElementById('textoError').textContent = mensaje;
        document.getElementById('mensajeError').classList.add('activo');
    }

    ocultarError() {
        document.getElementById('mensajeError').classList.remove('activo');
    }

    mostrarMensajeBienvenida() {
        console.log('Aplicación del Clima iniciada correctamente');
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AplicacionClima();
});

// Manejo de errores globales
window.addEventListener('error', (evento) => {
    console.error('Error en la aplicación:', evento.error);
});