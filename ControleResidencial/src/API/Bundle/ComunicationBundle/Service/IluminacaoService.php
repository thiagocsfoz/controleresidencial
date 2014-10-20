<?php

namespace API\Bundle\ComunicationBundle\Service;
use API\Bundle\CoreBundle\Service\AbstractService;
use Guzzle\Http\Client;
use Symfony\Component\HttpFoundation\Response;

class IluminacaoService extends AbstractService
{

    public function Acender($request)
    {
        try {
            $url = 'http://' .$this->app['ip'].'/?s=iluminacao&a=true&p=' . $request->porta;
            $client = new Client();
            $request = $client->get($url, ['timeout' => 1, 'connect_timeout' => 1]);
            $response = $request->send();
            return  $response;
        } catch (\Exception $e){
            return new Response(array("erro" => $e->getMessage()) , 408 );
        }
    }

    public function Apagar($request)
    {
        try {
            $url = 'http://' .$this->app['ip'].'/?s=iluminacao&a=false&p=' . $request->porta;
            $client = new Client();
            $request = $client->get($url, ['timeout' => 1, 'connect_timeout' => 1]);
            $response = $request->send();

            return  $response;
        } catch (\Exception $e){
            return new Response(array("erro" => $e->getMessage()) , 408 );
        }
    }
}
