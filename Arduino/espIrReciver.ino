#include <IRrecv.h>
#include <IRremoteESP8266.h>
#include <IRutils.h>

#define IR_RECEIVE_PIN 5  // GPIO5 = D1 no NodeMCU

IRrecv irrecv(IR_RECEIVE_PIN);
decode_results results;

void setup() {
  Serial.begin(9600);  // Inicia a interface serial
  irrecv.enableIRIn(); // Inicia o receptor IR
}

void loop() {
  if (irrecv.decode(&results)) {
    Serial.println(results.value, HEX);  // Imprime os dados brutos em hexadecimal
    Serial.print("Decoded Raw Data: ");
    serialPrintUint64(results.value, HEX);
    Serial.println();
    
    irrecv.resume(); // Habilita a recepção do próximo valor
  }
}

