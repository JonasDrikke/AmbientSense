# AmbientSense 🌿

**AmbientSense** es una solución integral de monitoreo ambiental que combina una aplicación móvil desarrollada en **Ionic/Angular** con un sistema embebido basado en **ESP32**. La aplicación permite visualizar en tiempo real datos de temperatura y humedad, gestionar perfiles de usuario y mantener un historial de mediciones local mediante SQLite.

## 🚀 Características Principales

* **Monitoreo en Tiempo Real**: Visualización de datos enviados por sensores vía Bluetooth Low Energy (BLE).
* **Gestión de Usuarios**: Registro, inicio de sesión, cambio de contraseña y eliminación de cuenta con persistencia en SQLite.
* **Interfaz Moderna**: Diseño en modo oscuro optimizado para dispositivos móviles con retroalimentación mediante Toasts nativos.
* **Historial Local**: Almacenamiento de mediciones directamente en el dispositivo.

## 🛠️ Tecnologías y Librerías

### Frontend & Mobile
* **Ionic 7+ / Angular 17+** (Standalone Components).
* **Capacitor**: Para el puente nativo con Android.
* **Capacitor SQLite**: Gestión de base de datos relacional local.
* **Capacitor Community Bluetooth-LE**: Para la comunicación con el ESP32.

### Hardware
* **ESP32** (Microcontrolador principal).
* **Sensor DHT11 o DHT22** (Humedad y Temperatura).

## 📥 Clonación e Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/AmbientSense.git](https://github.com/tu-usuario/AmbientSense.git)
    cd AmbientSense
    ```

2.  **Instalar dependencias de Node:**
    ```bash
    npm install
    ```

3.  **Instalar librerías específicas (si no se incluyeron):**
    ```bash
    npm install @capacitor-community/sqlite
    npm install @capacitor-community/bluetooth-le
    npm install @ionic/angular-standalone ionicons
    ```

4.  **Sincronizar con Android:**
    ```bash
    ionic cap add android
    ionic cap sync android
    ```

## 🔌 Configuración del ESP32 (BleApp.ino)

Para que la aplicación reconozca el dispositivo, debes cargar el código proporcionado en la carpeta `/hardware` (o donde lo hayas ubicado).

### Requisitos:
* **Arduino IDE** con el paquete de tarjetas ESP32 instalado.
* Librerías: `BLEDevice`, `BLEServer`, `BLEUtils`, `BLE2902`.

### Pasos para flashear:
1.  Abre el archivo `BleApp.ino` en Arduino IDE.
2.  Conecta tu ESP32 mediante USB.
3.  Selecciona tu placa (ej: **DOIT ESP32 DEVKIT V1**).
4.  Asegúrate de que los UUIDs en el código coincidan con los configurados en el `DatabaseService` o el servicio de Bluetooth de la app.
5.  Haz clic en **Upload**.

## 📱 Ejecución en Dispositivo

Para probar la conectividad Bluetooth y la base de datos SQLite, es necesario usar un dispositivo físico Android:

1.  Abre la carpeta `android` en **Android Studio**.
2.  Conecta tu celular y activa la **Depuración USB**.
3.  Ejecuta el proyecto desde Android Studio o mediante el comando:
    ```bash
    ionic cap run android -l --external
    ```

---
© 2026 Jonathan De Santiago - Software Development TSU (UTA).
