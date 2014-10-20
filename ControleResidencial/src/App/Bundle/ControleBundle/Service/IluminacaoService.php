<?php

namespace App\Bundle\ControleBundle\Service;
use App\Bundle\CoreBundle\Service\AbstractService;
use App\Bundle\ControleBundle\Entity\Iluminacao;
use Guzzle\Http\Message\Response;


class IluminacaoService extends AbstractService
{
    public function insert( Iluminacao $aplicacoes)
    {
        $aplicacoes = $this->get('doctrine')->getRepository('APIAdminBundle:Aplicacoes', 'api')->insert( $aplicacoes );

        return $aplicacoes;
    }

    public function acender(Iluminacao $iluminacao){
        try {
        $parameters = new \StdClass();
        $parameters->porta = $iluminacao->porta;

        if($iluminacao->status)
            $return = $this->requestAPI('IluminacaoService', 'apagar', [$parameters]);
        else
            $return = $this->requestAPI('IluminacaoService', 'acender', [$parameters]);

        $iluminacao =  $this->get('doctrine')->getRepository('AppControleBundle:Iluminacao', 'app')->update( $iluminacao );

        return $iluminacao;

        } catch (\Exception $e){
            return new Response(array("erro" => $e->getMessage()) , 408 );
        }
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
        $result =  $this->get('doctrine')->getRepository('AppControleBundle:Iluminacao', 'app')->listAll();
        return $result;
    }
}
