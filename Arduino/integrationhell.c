#include <SPI.h>
#include <Ethernet.h>
#include <ArduinoJson.h>
#include <LiquidCrystal.h>

// Configurações da rede
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };  // Endereço MAC da Ethernet Shield
IPAddress ip(192, 168, 15, 177);  // IP do Arduino
IPAddress server(192, 168, 15, 100);  // IP do servidor

// Inicialização do cliente Ethernet
EthernetClient client;

// Inicialização do display LCD
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);

// Botão conectado à porta digital 10
const int buttonPin = 1;
int buttonState = 0;
int lastButtonState = 0;

const int IRSensorPin = 9

void setup() {

  int tSendPin = 13;
  IrSender.begin(tSendPin, ENABLE_LED_FEEDBACK, USE_DEFAULT_FEEDBACK_LED_PIN);


  Serial.begin(9600);
  lcd.begin(16, 2);  // Inicializa o display LCD com 16 colunas e 2 linhas
  lcd.print("SSE:");

  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);  // Inicia o receptor IR

  // Configuração do botão como entrada
  pinMode(buttonPin, INPUT);

  // Inicializa a conexão Ethernet
  Ethernet.begin(mac, ip);
  delay(1000);  // Aguarda a inicialização da Ethernet

  Serial.println("Iniciando conexão ao servidor...");

  // Conecta ao servidor
  if (client.connect(server, 3000)) {
    Serial.println("Conectado ao servidor");

    // Faz o pedido GET para o endpoint SSE
    client.println("GET /sse/EEFG HTTP/1.1");
    client.println("Host: 192.168.15.100");
    client.println("Accept: text/event-stream");
    client.println("Connection: keep-alive");
    client.println();
  } else {
    Serial.println("Falha ao conectar ao servidor");
  }
}

void loop() {
    if (IrReceiver.decode()) {
    Serial.println(IrReceiver.decodedIRData.decodedRawData, HEX);  // Print "old" raw data
    IrReceiver.printIRResultShort(&Serial);                        // Print complete received data in one line
    IrReceiver.printIRSendUsage(&Serial);                          // Print the statement required to send this data
    IrReceiver.resume();                                           // Enable receiving of the next value
  }

  // Verifica se há dados disponíveis do servidor
  while (client.available()) {
    String line = client.readStringUntil('\n');
    line.trim(); // Remove espaços em branco

    // Verifica se a linha contém um evento SSE
    if (line.startsWith("data:")) {
      String data = line.substring(5); // Remove o prefixo "data:"

      StaticJsonDocument<200> doc;
      DeserializationError error = deserializeJson(doc, data);

      // Verifica se o parsing foi bem-sucedido
      if (!error) {
        const char* message = doc["message"];
        Serial.print("Mensagem recebida: ");
        Serial.println(message);

        // Exibe a mensagem no LCD
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Mensagem:");
        lcd.setCursor(0, 1);
        lcd.print(message);
      } else {
        Serial.print("Erro ao fazer parsing do JSON: ");
        Serial.println(error.c_str());
      }
    }
  }

  // Verificação do estado do botão
  buttonState = digitalRead(buttonPin);

  // Se o estado do botão mudou (foi pressionado)
  if (buttonState != lastButtonState) {
    if (buttonState == HIGH) {
      // Imprime novamente a última mensagem recebida no serial
      Serial.print("Última mensagem: ");
      Serial.println("teste");

      // Opcional: enviar a mensagem de volta para o servidor (se necessário)
      // Exemplo: client.println("POST /response HTTP/1.1");
      // Exemplo: client.println("Content-Type: text/plain");
      // Exemplo: client.print("Mensagem enviada: ");
      // Exemplo: client.println(message);
    }
    delay(50);  // Debouncing do botão
  }

  lastButtonState = buttonState;

  // Verifica se a conexão foi encerrada
  if (!client.connected()) {
    Serial.println();
    Serial.println("Conexão encerrada pelo servidor");
    client.stop();
    while (true);  // Para a execução
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
