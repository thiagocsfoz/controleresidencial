<?php

namespace API\Bundle\AdminBundle\Service;
use API\Bundle\CoreBundle\Service\AbstractService;
use API\Bundle\AdminBundle\Entity\Aplicacoes;



class AplicacoesService extends AbstractService
{
    public function insert( Aplicacoes $aplicacoes)
    {
        $aplicacoes = $this->get('doctrine')->getRepository('APIAdminBundle:Aplicacoes', 'api')->insert( $aplicacoes );

        return $aplicacoes;
    }

    public function update( Aplicacoes $aplicacoes )
    {
        $aplicacoes =  $this->get('doctrine')->getRepository('APIAdminBundle:Aplicacoes', 'api')->update( $aplicacoes );
        return $aplicacoes;
    }

    public function remove( Aplicacoes $aplicacoes )
    {
        try{
            $this->get('doctrine')->getRepository('APIAdminBundle:Aplicacoes', 'api')->remove( $aplicacoes->id );

        } catch(\Exception $e)
        {
            return false;
        }

    }

    public function listAll()
    {
        $result =  $this->get('doctrine')->getRepository('APIAdminBundle:Aplicacoes', 'api')->listAll();
        return $result;
    }

}
