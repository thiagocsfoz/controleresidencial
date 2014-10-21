<?php

// src/Acme/SearchBundle/EventListener/SearchIndexerSubscriber.php
namespace App\Bundle\CoreBundle\EventListener;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Nc\FayeClient\Adapter\CurlAdapter;
use Nc\FayeClient\Client;

// for Doctrine 2.4: Doctrine\Common\Persistence\Event\LifecycleEventArgs;


class IluminacaoSubscriber implements EventSubscriber
{
    public function getSubscribedEvents()
    {
        return array(
            'postPersist',
            'postUpdate',
        );
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

    public function postPersist(LifecycleEventArgs $args)
    {

    }

    public function index(LifecycleEventArgs $args)
    {

    }
}