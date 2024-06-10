#include <SPI.h>
#include <Ethernet.h>
#include <IRremote.hpp>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 0, 177);
EthernetClient client;

void setup() {
  int tSendPin = 13;
  IrSender.begin(tSendPin, ENABLE_LED_FEEDBACK, USE_DEFAULT_FEEDBACK_LED_PIN);
  Ethernet.begin(mac, ip);
  Serial.begin(9600);
  if (client.connect(ip, 3000)) {
    client.println("GET /events HTTP/1.1");
    client.println("Host: 192.168.0.177");
    client.println("Accept: text/event-stream");
    client.println("Connection: close");
    client.println();
  }
}

void loop() {
  if (client.connected()) {
    if (client.available()) {
      String line = client.readStringUntil('\n');
      if (line.startsWith("data: ")) {
        String command = line.substring(6);
        executeCommand(command);
      }
    }
  } else {
    // Reconnect if connection is lost
    if (client.connect(ip, 3000)) {
      client.println("GET /events HTTP/1.1");
      client.println("Host: 192.168.0.177");
      client.println("Accept: text/event-stream");
      client.println("Connection: close");
      client.println();
    }
  }
}

void executeCommand(String command) {
  // Execute the command as before...
}