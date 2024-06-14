#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* apSSID = "ESP8266AP";
const char* apPassword = "12345678";
ESP8266WebServer server(80);

String page = "";

void setup() {
  Serial.begin(115200);
  delay(100);

  WiFi.softAP(apSSID, apPassword);
  Serial.println("Ponto de acesso configurado. Conecte-se a: " + String(apSSID));

  server.on("/", []() {
    String networks = getNetworks();
    server.send(200, "text/html", networks);
  });

  server.on("/save", []() {
    String password = server.arg("password");
    if (password != "") {
      WiFi.softAPdisconnect(true);
      WiFi.begin(server.arg("ssid").c_str(), password.c_str());
      while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
      }
      Serial.println("Conectado a " + WiFi.SSID());
      server.send(200, "text/html", "Configurações salvas. Dispositivo conectado a: " + WiFi.SSID());
    } else {
      server.send(200, "text/html", "Por favor, insira a senha.");
    }
  });

  server.begin();
}

void loop() {
  server.handleClient();

  if (WiFi.status() != WL_CONNECTED) {
    // Se não estiver conectado à internet, mantenha o ponto de acesso ligado
    if (!WiFi.softAPgetStationNum()) {
      WiFi.softAP(apSSID, apPassword);
      Serial.println("Ponto de acesso ativado.");
    }
  } else {
    // Se estiver conectado à internet, desligue o ponto de acesso e faça a solicitação HTTP
    WiFi.softAPdisconnect(true);
    Serial.println("Ponto de acesso desativado.");

    makeHttpRequest();
  }
}

String getNetworks() {
  String networkList = "<form action=\"/save\" method=\"get\">";
  int numNetworks = WiFi.scanNetworks();
  for (int i = 0; i < numNetworks; i++) {
    networkList += "<input type=\"radio\" name=\"ssid\" value=\"" + WiFi.SSID(i) + "\"> " + WiFi.SSID(i) + "<br>";
  }
  networkList += "<label for=\"password\">Senha:</label><br>\
                  <input type=\"password\" id=\"password\" name=\"password\"><br>\
                  <input type=\"submit\" value=\"Conectar\">\
                  </form>";
  return networkList;
}

void makeHttpRequest() {
  HTTPClient http;
  WiFiClientSecure client;
  client.setInsecure();  // Desabilita a verificação do certificado, útil para conexões HTTPS
  
  Serial.print("Fazendo solicitação HTTP para: ");
  Serial.println("https://www.omdbapi.com/?t=minions&apikey=4a3b711b");

  http.begin(client, "https://www.omdbapi.com/?t=minions&apikey=4a3b711b");
  int httpCode = http.GET();
  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println("Resposta recebida:");
      Serial.println(payload);
      
      // Parse JSON
      DynamicJsonDocument doc(1024);
      DeserializationError error = deserializeJson(doc, payload);
      if (error) {
        Serial.print("Falha ao analisar JSON: ");
        Serial.println(error.c_str());
      } else {
        // Extract data
        const char* title = doc["Title"];
        Serial.print("Título: ");
        Serial.println(title);
      }
    } else {
      Serial.print("Falha na solicitação HTTP, código de status: ");
      Serial.println(httpCode);
    }
  } else {
    Serial.print("Falha na solicitação HTTP, erro: ");
    Serial.println(http.errorToString(httpCode).c_str());
  }
  
  http.end();
}
