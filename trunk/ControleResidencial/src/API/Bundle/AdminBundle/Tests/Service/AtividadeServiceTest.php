<?php




/**
 * Created by PhpStorm.
 * User: Thiago
 * Date: 17/06/14
 * Time: 11:45
 */

namespace Operadores\Bundle\AdminBundle\Tests\Service;

use Operadores\Bundle\AdminBundle\Entity\Atividade;
use Operadores\Bundle\AdminBundle\Entity\Resposta;
use Operadores\Bundle\AdminBundle\Service\AtividadeService;
use Operadores\Bundle\AdminBundle\Service\RespostaService;
use Operadores\Bundle\CoreBundle\Tests\AbstractTestCase;

class AtividadeServiceTest extends AbstractTestCase
{

    public function testCrud()
    {
        $AtividadeService = new AtividadeService($this->getContainer());
        $RespostaService  = new RespostaService($this->getContainer());

        //Test Insert
        $objAtividade = new Atividade();
        $objAtividade->descricaoPortugues = "descricaoPortugues";
        $objAtividade->descricaoEspanhol = "descricaoEspanhol";
        $objAtividade->nivelCritico = "BAIXO";
        $objAtividade->status = true;
        $objAtividade->tipo = "MULTI";
        $objAtividade->validoPortugues = true;
        $objAtividade->validoEspanhol = true;

        $objAtividade = $AtividadeService->insert($objAtividade);
        $atividade = $objAtividade;

        $objAtividade->equipamentos = array();
        $objAtividade->datacenters = array();

        $respostas = array();
        $objResposta1 = new Resposta();
        $objResposta1->nomePortugues = "Resposta em portugues";
        $objResposta1->nomeEspanhol  = "Resposta em espanhol";
        $objResposta1->atividade  = $atividade;
        $objResposta1->atividadesCondicionais = array();

        $respostas[] = $objResposta1;

        $this->assertNotNull($objAtividade->id);
        $this->assertEquals('descricaoPortugues', $objAtividade->descricaoPortugues);
        $this->assertEquals('descricaoEspanhol', $objAtividade->descricaoEspanhol);
        $this->assertEquals('BAIXO', $objAtividade->nivelCritico);
        $this->assertEquals(true, $objAtividade->status);
        $this->assertEquals("MULTI", $objAtividade->tipo);
        $this->assertEquals(true, $objAtividade->validoPortugues);
        $this->assertEquals(true, $objAtividade->validoEspanhol);

        //Test Update
        $objAtividade = new Atividade();
        $objAtividade->id = 1;

        $objAtividadeUpdate = $AtividadeService->findById($objAtividade);
        $objAtividadeUpdate->descricaoPortugues = "Descrição Update";
        $objAtividadeUpdate->descricaoEspanhol  = "Descrição Update";

        $objAtividadeUpdate = $AtividadeService->update($objAtividadeUpdate);

        $this->assertNotNull($objAtividade->id);
        $this->assertEquals("Descrição Update", $objAtividadeUpdate->descricaoPortugues);
        $this->assertEquals("Descrição Update", $objAtividadeUpdate->descricaoEspanhol);

        //Test Remove
        try{
            $AtividadeService->remove($objAtividade);
        }  catch(\Exception $e){
            $this->fail($e->getMessage());
        }

        //Test List All
        $atividades = $AtividadeService->listAll();
        $this->assertNotNull($atividades);
        $this->assertTrue(count($atividades) > 0);

        //Test List By Filtros
        $atividades = $AtividadeService->listByFilters((object) array("filters" => null, "pageRequest" => null));
        $this->assertNotNull($atividades);
        $this->assertTrue(count($atividades) > 0);
    }
}