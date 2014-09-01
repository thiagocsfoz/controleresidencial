<?php
/**
 * Created by PhpStorm.
 * User: Thiago
 * Date: 26/06/14
 * Time: 09:21
 */

namespace Operadores\Bundle\AdminBundle\Tests\Service;


use Operadores\Bundle\AdminBundle\Entity\Atividade;
use Operadores\Bundle\AdminBundle\Entity\Bloco;
use Operadores\Bundle\AdminBundle\Service\AtividadeService;
use Operadores\Bundle\AdminBundle\Service\BlocoService;
use Operadores\Bundle\CoreBundle\Tests\AbstractTestCase;

class BlocoServiceTest extends AbstractTestCase {

    public function testCrud() {

        //Service
        $blocoService = new BlocoService($this->getContainer());
        $atividadeService = new AtividadeService($this->getContainer());

        //Test Insert
        $objBloco = new Bloco();
        $objBloco->tituloPortugues = "Titulo do bloco em português";
        $objBloco->tituloEspanhol  = "Titulo do bloco em espanhol";
        $objBloco->descricaoPortugues = "Descrição do bloco em português";
        $objBloco->descricaoEspanhol = "Descrição do bloco em português";
        $objBloco->status = true;
        $objBloco->validoPortugues = true;
        $objBloco->validoEspanhol  = true;
        $objBloco->repetir = true;
        $atividade = new Atividade();
        $atividade->id = 1;
        $objBloco->atividades[] = $atividadeService->findById($atividade);
        $atividade->id = 2;
        $objBloco->atividades[] = $atividadeService->findById($atividade);
        $objBloco->equipamentos = array();
        $objBloco->datacenters = array();

        $returnBloco = $blocoService->insert($objBloco);
        $returnBloco = $returnBloco[0]->bloco;

        $this->assertNotNull($returnBloco->id);
        $this->assertEquals('Titulo do bloco em português', $returnBloco->tituloPortugues);
        $this->assertEquals('Titulo do bloco em espanhol',  $returnBloco->tituloEspanhol);
        $this->assertEquals('Descrição do bloco em português', $returnBloco->descricaoPortugues);
        $this->assertEquals('Descrição do bloco em português', $returnBloco->descricaoEspanhol);
        $this->assertEquals(true, $returnBloco->status);
        $this->assertEquals(true, $returnBloco->validoPortugues);
        $this->assertEquals(true, $returnBloco->validoEspanhol);

        //Test Update
        $objBloco->id = 1;
        $objblocoUpdate = $blocoService->findById($objBloco);
        $objblocoUpdate->bloco->atividades = $objblocoUpdate->atividades;
        //$objblocoUpdate = $objblocoUpdate->bloco;

        $objblocoUpdate->tituloPortugues = "Titulo do bloco em português atualizado";
        $objblocoUpdate->tituloEspanhol  = "Titulo do bloco em espanhol atualizado";
        $objblocoUpdate->descricaoPortugues = "Descrição do bloco em português atualizado";
        $objblocoUpdate->descricaoEspanhol = "Descrição do bloco em português atualizado";
        $objblocoUpdate->equipamentos = array();
        $objblocoUpdate->datacenters = array();
        $objblocoUpdate = $blocoService->update($objblocoUpdate);

        $this->assertNotNull($objblocoUpdate->id);
        $this->assertEquals('Titulo do bloco em português atualizado', $objblocoUpdate->tituloPortugues);
        $this->assertEquals('Titulo do bloco em espanhol atualizado',  $objblocoUpdate->tituloEspanhol);
        $this->assertEquals('Descrição do bloco em português atualizado', $objblocoUpdate->descricaoPortugues);
        $this->assertEquals('Descrição do bloco em português atualizado', $objblocoUpdate->descricaoEspanhol);
        $this->assertEquals(true, $objblocoUpdate->status);
        $this->assertEquals(true, $objblocoUpdate->validoPortugues);
        $this->assertEquals(true, $objblocoUpdate->validoEspanhol);

        //Test List All
        $blocos = $blocoService->listAll();
        $this->assertNotNull($blocos);
        $this->assertTrue(count($blocos) > 0);

        //Test List By filter
        $blocos = $blocoService->listByFilters((object) array("filters" => null, "pageRequest" => null));
        $this->assertNotNull($blocos);
        $this->assertTrue(count($blocos) > 0);



        //Test Remove
        try{
            $blocoService->remove($objBloco);
        }  catch(\Exception $e){
            $this->fail($e->getMessage());
        }

    }
}
 