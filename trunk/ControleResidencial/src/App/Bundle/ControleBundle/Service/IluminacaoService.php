<?php

namespace App\Bundle\ControleBundle\Service;
use App\Bundle\CoreBundle\Service\AbstractService;
use App\Bundle\ControleBundle\Entity\Iluminacao;



class IluminacaoService extends AbstractService
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
        $result =  $this->get('doctrine')->getRepository('AppControleBundle:Iluminacao', 'app')->listAll();
        return $result;
    }

}
