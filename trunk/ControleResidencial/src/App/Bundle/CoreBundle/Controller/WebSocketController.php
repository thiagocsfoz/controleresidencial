<?php

namespace App\Bundle\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Nc\FayeClient\Client;
use Nc\FayeClient\Adapter\CurlAdapter;
use Symfony\Component\HttpFoundation\JsonResponse;

class WebSocketController extends Controller
{
   public function indexAction(){

       $faye = new Client(new CurlAdapter(), 'http://localhost:3000/');
       $channel = '/iluminacao-controle';
       $data    = array('text' => 'Lorem ipsum dolor sin amet...');

       //envoi du message
       $faye->send($channel, $data);

       return new JsonResponse(array());
   }
}