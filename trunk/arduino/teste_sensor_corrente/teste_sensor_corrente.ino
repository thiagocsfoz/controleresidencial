//retirado de <a href="http://www.seriallink.com.br/forum/viewtopic.php?f=46&t=1900">http://www.seriallink.com.br/forum/viewtopic.php?f=46&t=1900</a>
const int sensorPin = A0;
float sensorValue_aux = 0;
float sensorValue = 0;
float sensorAtual = 0;
float currentValue = 0;
float voltsporUnidade = 0.0048828125;
 
void setup() {
 
Serial.begin(9600);
}
 
void loop() {
 
 for(int i=500; i>0; i--)
 {
 sensorValue_aux = (analogRead(sensorPin) -511); // le o sensor na pino analogico A0 e ajusta o valor lido ja que a saída do sensor é vcc/2 para corrente =0
 sensorValue += pow(sensorValue_aux,2); // soam os quadardos das leituras no laco
 }
 
 sensorValue = (sqrt(sensorValue/ 500)) * voltsporUnidade; // finaliza o calculo da méida quadratica e ajusta o valor lido para volts
 currentValue = (sensorValue/66)*100000; // calcula a corrente considerando a sensibilidade do sernsor (66 mV por amper)
 
 
 
 // mostra o resultado no terminal
 if((currentValue - sensorAtual) > 6 || (currentValue - sensorAtual) < -6){
     sensorAtual  = currentValue;
     if( sensorAtual > 10 ){
       Serial.print("Ligado" );
       Serial.print("\n" );
       delay(300);
     }else {
       Serial.print("Desligado" );
       Serial.print("\n" );
       delay(300);
     }
 }
 sensorValue = 0;
 delay(150);
 
}
