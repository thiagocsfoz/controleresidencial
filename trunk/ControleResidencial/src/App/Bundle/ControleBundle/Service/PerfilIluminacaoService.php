<?php

namespace App\Bundle\ControleBundle\Service;
use App\Bundle\CoreBundle\Service\AbstractService;
use App\Bundle\ControleBundle\Entity\PerfilIluminacao;

class PerfilIluminacaoService extends AbstractService
{
    public function insert( PerfilIluminacao $perfilIluminacao)
    {
        $aplicacoes = $this->get('doctrine')->getRepository('AppAdminBundle:PerfilIluminacao', 'api')->insert( $perfilIluminacao );

        return $aplicacoes;
    }

    public function usar(PerfilIluminacao $perfilIluminacao){
        //return $iluminacao;
    }

    public function update( Iluminacao $iluminacao)
    {
        $iluminacao =  $this->get('doctrine')->getRepository('AppControleBundle:Iluminacao', 'app')->update( $iluminacao );
        return $iluminacao;
    }

    public function remove( Iluminacao $aplicacoes )
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
        $result =  $this->get('doctrine')->getRepository('AppControleBundle:PerfilIluminacao', 'app')->listAll();
        return $result;
    }
}
