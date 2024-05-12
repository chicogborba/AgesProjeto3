#include <IRremote.hpp>

#define POWER_CODE 0xC7EA
#define NETFLIX_CODE 0xC7EA

void setup() {

  int tSendPin = 13;
  IrSender.begin(tSendPin, ENABLE_LED_FEEDBACK, USE_DEFAULT_FEEDBACK_LED_PIN);

};

void loop() {
  IrSender.sendNEC(POWER_CODE, 0x17, 0);
  delay(10000);
  IrSender.sendNEC(NETFLIX_CODE, 0x52, 0);
  delay(10000);

}