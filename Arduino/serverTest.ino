#include <SPI.h>
#include <Ethernet.h>
#include <IRremote.hpp>


// // Definindo a lista de comandos
// String commands[] = {
//   "down",    "right",   "right", "right",
//   "confirm", "up",      "left",  "left",
//   "left",    "confirm", "down",  "down",
//   "right",   "confirm", "up",    "up",
//   "left",    "confirm", "down",  "right",
//   "right",   "right",   "right", "right",
//   "confirm", "left",    "left",  "left",
//   "confirm", "down",    "left",  "confirm",
//   "up",      "up",      "right", "right",
//   "confirm", "left",    "left",  "left",
//   "confirm"
// };


// Defina o endereço IP do Arduino
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 0, 177); // Altere para o IP desejado

EthernetServer server(80);

void setup() {

  int tSendPin = 8;
  IrSender.begin(tSendPin, ENABLE_LED_FEEDBACK, USE_DEFAULT_FEEDBACK_LED_PIN);
  // Inicializa a conexão Ethernet e o servidor
  Ethernet.begin(mac, ip);
  server.begin();
  // Inicializa a comunicação serial
  Serial.begin(9600);
}

void loop() {
  // Escuta por conexões
  EthernetClient client = server.available();
  if (client) {
    // Se houver uma conexão, execute a função de resposta
    handleClient(client);
  }
}


void executeCommands(String commands[], int length) {
  // Iterando sobre a lista de comandos
  for (int i = 0; i < length; i++) {
    // Verificando qual é o comando
    if (commands[i] == "confirm") {
      IrSender.sendNEC(0xC7EA, 0x2A, 0);
      delay(100);
    } else if (commands[i] == "down") {
      IrSender.sendNEC(0xC7EA, 0x33, 0);
      delay(100);
    } else if (commands[i] == "right") {
      IrSender.sendNEC(0xC7EA, 0x2D, 0);
      delay(100);

    } else if (commands[i] == "up") {
      IrSender.sendNEC(0xC7EA, 0x19, 0);
      delay(100);

    } else if (commands[i] == "left") {
      IrSender.sendNEC(0xC7EA, 0x1E, 0);
      delay(100);

    } else {
    }
  }
}

void handleClient(EthernetClient client) {
  // Lê a requisição HTTP
  String currentLine = "";
  String postData = "";
  while (client.connected()) {
    if (client.available()) {
      char c = client.read();
      if (c == '\n') {
        // Se a linha estiver vazia, é o fim do cabeçalho HTTP
        if (currentLine.length() == 0) {
          // Lê e imprime os dados da requisição POST
          while(client.available()){
            char c = client.read();
            postData += c;
            Serial.print(c);
          }
          // Envia a resposta HTTP
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/plain");
          client.println();
          client.println("Received");
          client.stop();
          break;
        } else { // Se a linha não estiver vazia, é uma linha do cabeçalho HTTP
          currentLine = "";
        }
      } else if (c != '\r') { // Se o caractere não for retorno de carro, adiciona à linha atual
        currentLine += c;
      }
    }
  }
  // Split postData into commands
  int i = 0;
  char* token = strtok(&postData[0], ",");
  String commands[10]; // Adjust the size as needed
  while (token != NULL) {
    commands[i++] = String(token);
    token = strtok(NULL, ",");
  }
  executeCommands(commands, i);
}