#include <SPI.h>
#include <Ethernet.h>

// Defina o endereço IP do Arduino
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 0, 177); // Altere para o IP desejado

EthernetServer server(80);

void setup() {
  // Inicializa o LED interno como saída
  pinMode(LED_BUILTIN, OUTPUT);
  // Inicializa a conexão Ethernet e o servidor
  Ethernet.begin(mac, ip);
  server.begin();
}

void loop() {
  // Escuta por conexões
  EthernetClient client = server.available();
  if (client) {
    // Se houver uma conexão, execute a função de resposta
    handleClient(client);
  }
}

void handleClient(EthernetClient client) {
  // Lê a requisição HTTP
  while (client.connected()) {
    if (client.available()) {
      // Ignora os dados da requisição
      client.read();
    }

    // Envia a resposta HTTP com dados em JSON
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: application/json"); // Tipo de conteúdo é JSON
    client.println();
    client.println("{ \"message\": \"Hello, world!\" }"); // Dados em JSON como resposta
    client.stop();

    // Faz o LED piscar por alguns segundos
    digitalWrite(LED_BUILTIN, HIGH);
    delay(1000); // Aguarda 1 segundo
    digitalWrite(LED_BUILTIN, LOW);
    delay(1000); // Aguarda 1 segundo
    break;
  }
}

