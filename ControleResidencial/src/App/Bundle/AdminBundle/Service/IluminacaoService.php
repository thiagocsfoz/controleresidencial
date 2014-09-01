<?php

namespace App\Bundle\AdminBundle\Service;
use App\Bundle\CoreBundle\Service\AbstractService;
use App\Bundle\AdminBundle\Entity\Iluminacao;



class IluminacaoService extends AbstractService
{

    public function insert( Iluminacao $iluminacao)
    {
        $iluminacao = $this->getRepository( Iluminacao::$NAME )->insert( $iluminacao );
        return $iluminacao;
    }

    public function update()
    {
    }

    public function remove()
    {

    }

    public function findById( Iluminacao $iluminacao )
    {
        return $this->getRepository( Iluminacao::$NAME )->findById( $iluminacao->id );
    }

    public function listAll()
    {
        return $this->getRepository( 'App\Bundle\AdminBundle\Entity\Iluminacao' )->listAll();
    }


     public function listByFilters( $filters )
    {

    }
}
