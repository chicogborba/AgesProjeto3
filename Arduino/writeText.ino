#include <IRremote.hpp>

// Definindo a lista de comandos
String commands[] = {
  "down",    "right",   "right", "right",
  "confirm", "up",      "left",  "left",
  "left",    "confirm", "down",  "down",
  "right",   "confirm", "up",    "up",
  "left",    "confirm", "down",  "right",
  "right",   "right",   "right", "right",
  "confirm", "left",    "left",  "left",
  "confirm", "down",    "left",  "confirm",
  "up",      "up",      "right", "right",
  "confirm", "left",    "left",  "left",
  "confirm"
};

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

void setup() {

  Serial.begin(9600);
  int tSendPin = 13;
  IrSender.begin(tSendPin, ENABLE_LED_FEEDBACK, USE_DEFAULT_FEEDBACK_LED_PIN);

  executeCommands(commands, sizeof(commands)/sizeof(commands[0]));
}

void loop() {
  // O loop está vazio porque os comandos são executados apenas uma vez
}