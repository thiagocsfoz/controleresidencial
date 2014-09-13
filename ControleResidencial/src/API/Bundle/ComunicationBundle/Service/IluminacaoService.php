<?php

namespace API\Bundle\ComunicationBundle\Service;
use API\Bundle\CoreBundle\Service\AbstractService;
use Guzzle\Http\Client;



class IluminacaoService extends AbstractService
{

    public function Acender($request)
    {
        try {
            //$client   = new Client($this->app['ip'].  '/?s=iluminacao&a=true&p=' . $request->porta);
            //$client   = new Client();
            //$request  = $client->get('http://192.168.1.150/?s=iluminacao&a=true&p=8');
            //$request->send();

            $client = new Client();
            // Create a request that has a query string and an X-Foo header
            $request = $client->get('http://192.168.1.150/', array('s' => 'iluminacao', 'a' => true , 'p' => 8));

            ob_start();
            print_r('teste1');

            $output = ob_get_clean();
            file_put_contents( "/tmp/thiago.log", $output , FILE_APPEND);

            // Send the request and get the response
            $response = $request->send();

            ob_start();
            print_r('teste2');

            $output = ob_get_clean();
            file_put_contents( "/tmp/thiago.log", $output , FILE_APPEND);




            return  $response;
        } catch (\Exception $e){
            return array("error" => $e->getMessage());
        }
    }

    public function Apagar($request)
    {
        try {
            $client   = new Client($this->app['ip'].  '/?s=iluminacao&a=false&p=' . $request->porta);
            $request  = $client->get();

            return  $request->send();
        } catch (\Exception $e){
            return array("error" => $e->getMessage());
        }
    }
}
