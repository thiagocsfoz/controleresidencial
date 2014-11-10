// A simple web server that always just says "Hello World"

#include "etherShield.h"
#include "ETHER_28J60.h"

static uint8_t mac[6] = {0x54, 0x55, 0x58, 0x10, 0x00, 0x24};   // this just needs to be unique for your network, 
                                                                // so unless you have more than one of these boards
                                                                // connected, you should be fine with this value.
                                                           
static uint8_t ip[4] = {192, 168, 1, 150};                       // the IP address for your board. Check your home hub
                                                                // to find an IP address not in use and pick that
                                                                // this or 10.0.0.15 are likely formats for an address
                                                                // that will work.

static uint16_t port = 80;                                      // Use port 80 - the standard for HTTP

ETHER_28J60 ethernet;

const int sensorPin = A0;
float sensorValue_aux = 0;
float sensorValue = 0;
float currentValue = 0;
float voltsporUnidade = 0.0048828125;

void setup()
{ 
  pinMode (8, OUTPUT);
  pinMode (7, OUTPUT);
  pinMode (6, OUTPUT);
  pinMode (5, OUTPUT);
  ethernet.setup(mac, ip, port);
}

void loop()
{  
   for(int i=500; i>0; i--)
   {
   sensorValue_aux = (analogRead(sensorPin) -511); // le o sensor na pino analogico A0 e ajusta o valor lido ja que a saída do sensor é vcc/2 para corrente =0
   sensorValue += pow(sensorValue_aux,2); // soam os quadardos das leituras no laco
   }
   
   sensorValue = (sqrt(sensorValue/ 500)) * voltsporUnidade; // finaliza o calculo da méida quadratica e ajusta o valor lido para volts
   currentValue = (sensorValue/66)*1000; // calcula a corrente considerando a sensibilidade do sernsor (66 mV por amper)
  
  
  char* param;
  if (param = ethernet.serviceRequest())
  {
    ethernet.print("Corrent: ");
    ethernet.print(currentValue);
    
    if(strcmp(param, "?s=iluminacao&a=true&p=8") == 0){
        digitalWrite (8, HIGH);
    }
    if(strcmp(param, "?s=iluminacao&a=false&p=8") == 0){
        digitalWrite (8, LOW);
    }    
    
    ethernet.respond();    
  }
  delay(100);
}

