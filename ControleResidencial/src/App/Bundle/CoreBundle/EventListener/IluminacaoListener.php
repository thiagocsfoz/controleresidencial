<?php

// src/Acme/SearchBundle/EventListener/SearchIndexer.php
namespace App\Bundle\CoreBundle\EventListener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use App\Bundle\ControleBundle\Entity\Iluminacao;
use GuzzleHttp\Event\EventInterface;
use Nc\FayeClient\Adapter\CurlAdapter;
use Nc\FayeClient\Client;

class IluminacaoListener
{
    public function postPersist(LifecycleEventArgs $args)
    {

    }

    public function postUpdate(LifecycleEventArgs $args)
    {
        $faye = new Client(new CurlAdapter(), 'http://localhost:3000/');
        $channel = '/iluminacao-controle';

        $entity = $args->getObject();
        $entityManager = $args->getEntityManager('app');

        $statement = $entityManager->createQueryBuilder();

        $query = $statement
            ->select( 'obj' )
            ->from(get_class($entity), 'obj')
            ->orderBy('obj.id', 'asc');

        $data = $query->getQuery()->getArrayResult();
        $faye->send($channel, $data);
    }
}