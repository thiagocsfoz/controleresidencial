<?php

namespace API\Bundle\ComunicationBundle\Service;
use API\Bundle\CoreBundle\Service\AbstractService;
use Guzzle\Http\Client;



class IluminacaoService extends AbstractService
{

    public function Acender($request)
    {
        try {
            $client   = new Client($this->app['ip'].  '/?s=iluminacao&a=true&p=' . $request->port);
            $request  = $client->get();

            return  $request->send();
        } catch (\Exception $e){
            return array("error" => $e->getMessage());
        }
    }

    public function Apagar($request)
    {
        try {
            $client   = new Client($this->app['ip'].  '/?s=iluminacao&a=false&p=' . $request->port);
            $request  = $client->get();

            return  $request->send();
        } catch (\Exception $e){
            return array("error" => $e->getMessage());
        }
    }
}
