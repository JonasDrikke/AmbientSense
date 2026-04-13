#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLE2902.h> // Necesario para las notificaciones
#include "DHT.h"
 
#define DHTPIN 13
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
 
#define SERVICE_UUID        "12345678-1234-1234-1234-1234567890ab"
#define CHARACTERISTIC_UUID "abcd1234-5678-1234-5678-abcdef123456"
 
BLECharacteristic *pCharacteristic;
bool deviceConnected = false;
float lastTemp = 0, lastHum = 0;
 
unsigned long previousMillis = 0;
const long interval = 2000; 

// Clase para monitorear la conexión
class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("¡Teléfono conectado!");
    };
    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      Serial.println("Teléfono desconectado. Reiniciando publicidad...");
      BLEDevice::startAdvertising(); // Reinicia el anuncio para poder reconectar
    }
};
 
void setup() {
  Serial.begin(115200);
  dht.begin();
 
  BLEDevice::init("ESP32_MJPC_JDSO");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks()); // Callback de conexión
 
  BLEService *pService = pServer->createService(SERVICE_UUID);
 
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );

  pCharacteristic->addDescriptor(new BLE2902());
 
  pService->start();
  
BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID); // Esto hace que el nombre aparezca rápido
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("¡Listo! El ESP32 ya es visible.");
}
 
void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    float h = dht.readHumidity();
    float t = dht.readTemperature();

    if (deviceConnected && !isnan(h) && !isnan(t)) {
      // JSON limpio sin carácteres extra
      String json = "{\"temp\":" + String(t,1) + ",\"hum\":" + String(h,1) + "}";
      pCharacteristic->setValue(json.c_str());
      pCharacteristic->notify();
      
      lastTemp = t; lastHum = h;
    }
  }
}