<?php
/**
 * Created by PhpStorm.
 * User: Thiago
 * Date: 25/06/14
 * Time: 16:16
 */

namespace Operadores\Bundle\AdminBundle\Tests\Service;

use Operadores\Bundle\AdminBundle\Entity\CampoDinamico;
use Operadores\Bundle\AdminBundle\Entity\TipoEquipamento;
use Operadores\Bundle\AdminBundle\Service\CampoDinamicoService;
use Operadores\Bundle\AdminBundle\Service\TipoEquipamentoService;
use Operadores\Bundle\CoreBundle\Tests\AbstractTestCase;

class CampoDinamicoServiceTest extends AbstractTestCase {

    public function testCrud() {
        //Services
        $campoDinamicoService = new CampoDinamicoService($this->getContainer());
        $tipoEquipamentoService = new TipoEquipamentoService($this->getContainer());

        //Test Insert
        $objCampoDinamico = new CampoDinamico();
        $objCampoDinamico->nomePortugues = "Nome Campo Dinamico em Português";
        $objCampoDinamico->nomeEspanhol = "Nome Campo Dinamico em Espanhol";
        $objCampoDinamico->tipo = 0;
        $tipoEquipamento = new TipoEquipamento();
        $tipoEquipamento->id = 1;
        $objCampoDinamico->tipoEquipamento = $tipoEquipamentoService->findById($tipoEquipamento);
        $objCampoDinamico->validoPortugues = true;
        $objCampoDinamico->validoEspanhol = true;

        $returnCampoDinamico = $campoDinamicoService->insert($objCampoDinamico);

        $this->assertNotNull($returnCampoDinamico->id);
        $this->assertEquals('Nome Campo Dinamico em Português', $returnCampoDinamico->nomePortugues);
        $this->assertEquals('Nome Campo Dinamico em Espanhol', $returnCampoDinamico->nomeEspanhol);
        $this->assertEquals(0, $returnCampoDinamico->tipo);
        $this->assertNotNull($objCampoDinamico->tipoEquipamento);
        $this->assertEquals(true, $returnCampoDinamico->validoPortugues);
        $this->assertEquals(true, $returnCampoDinamico->validoEspanhol);

        //Test Update
        $objCampoDinamico = new CampoDinamico();
        $objCampoDinamico->id = 1;
        $objCampoDinamicoUpdate = $campoDinamicoService->findById($objCampoDinamico);

        $objCampoDinamicoUpdate->nomePortugues = "Nome Campo Dinamico em Português atualizado";
        $objCampoDinamicoUpdate->nomeEspanhol = "Nome Campo Dinamico em Espanhol atualizado";
        $tipoEquipamento = new TipoEquipamento();
        $tipoEquipamento->id = 3;
        $objCampoDinamicoUpdate->tipoEquipamento = $tipoEquipamentoService->findById($tipoEquipamento);

        $objCampoDinamicoUpdate = $campoDinamicoService->update($objCampoDinamicoUpdate);

        $this->assertNotNull($objCampoDinamicoUpdate->id);
        $this->assertEquals('Nome Campo Dinamico em Português atualizado', $objCampoDinamicoUpdate->nomePortugues);
        $this->assertEquals('Nome Campo Dinamico em Espanhol atualizado', $objCampoDinamicoUpdate->nomeEspanhol);
        $this->assertNotNull($objCampoDinamicoUpdate->tipoEquipamento);

        //Test List All
        $camposDinamicos = $campoDinamicoService->listAll();
        $this->assertNotNull($camposDinamicos);
        $this->assertTrue(count($camposDinamicos) > 0);

        //Test List By Filter
        $camposDinamicos = $campoDinamicoService->listByFilters((object) array("filters" => null, "pageRequest" => null));
        $this->assertNotNull($camposDinamicos);
        $this->assertTrue(count($camposDinamicos) > 0);

        //Test Remove
        try{
            $campoDinamicoService->remove($objCampoDinamico);
        }  catch(\Exception $e){
            $this->fail($e->getMessage());
        }
    }

}
 