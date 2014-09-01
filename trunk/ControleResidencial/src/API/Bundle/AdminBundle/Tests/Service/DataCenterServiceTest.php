<?php
/**
 * Created by PhpStorm.
 * User: Thiago
 * Date: 25/06/14
 * Time: 15:11
 */

namespace Operadores\Bundle\AdminBundle\Tests\Service;


use Operadores\Bundle\AdminBundle\Entity\DataCenter;
use Operadores\Bundle\AdminBundle\Service\DataCenterService;
use Operadores\Bundle\CoreBundle\Tests\AbstractTestCase;

class DataCenterServiceTest extends AbstractTestCase {

    public function testCrud() {
        //Services
        $dataCenterService = new DataCenterService($this->getContainer());

        //Test Insert
        $objDataCenter = new DataCenter();
        $objDataCenter->nomePortugues = "Nome do data center em Português";
        $objDataCenter->nomeEspanhol  = "Nome do data center em Espanhol";
        $objDataCenter->descricaoPortugues = "Descrição do data center em português";
        $objDataCenter->descricaoEspanhol  = "Descrição do data center em espanhol";
        $objDataCenter->status = true;
        $objDataCenter->validoPortugues = true;
        $objDataCenter->validoEspanhol = true;

        $returnDataCenter = $dataCenterService->insert($objDataCenter);

        $this->assertNotNull($returnDataCenter->id);
        $this->assertEquals('Nome do data center em Português', $returnDataCenter->nomePortugues);
        $this->assertEquals('Nome do data center em Espanhol', $returnDataCenter->nomeEspanhol);
        $this->assertEquals('Descrição do data center em português', $returnDataCenter->descricaoPortugues);
        $this->assertEquals('Descrição do data center em espanhol', $returnDataCenter->descricaoEspanhol);
        $this->assertEquals(true, $returnDataCenter->status);
        $this->assertEquals(true, $returnDataCenter->validoPortugues);
        $this->assertEquals(true, $returnDataCenter->validoEspanhol);

        //Test Update
        $objDataCenter = new DataCenter();
        $objDataCenter->id = 1;

        $objDataCenterUpdate = $dataCenterService->findById($objDataCenter);

        $objDataCenterUpdate->nomePortugues = "Nome do data center em Português atualizado";
        $objDataCenterUpdate->nomeEspanhol  = "Nome do data center em Espanhol atualizado";
        $objDataCenterUpdate->descricaoPortugues = "Descrição do data center em português atualizado";
        $objDataCenterUpdate->descricaoEspanhol  = "Descrição do data center em espanhol atualizado";
        $objDataCenterUpdate->status = false;

        $this->assertNotNull($objDataCenterUpdate->id);
        $this->assertEquals('Nome do data center em Português atualizado', $objDataCenterUpdate->nomePortugues);
        $this->assertEquals('Nome do data center em Espanhol atualizado', $objDataCenterUpdate->nomeEspanhol);
        $this->assertEquals('Descrição do data center em português atualizado', $objDataCenterUpdate->descricaoPortugues);
        $this->assertEquals('Descrição do data center em espanhol atualizado', $objDataCenterUpdate->descricaoEspanhol);
        $this->assertEquals(false, $objDataCenterUpdate->status);

        //Test List All
        $datacentes = $dataCenterService->listAll();
        $this->assertNotNull($datacentes);
        $this->assertTrue(count($datacentes) > 0);

        //Test List By Filter
        $datacentes = $dataCenterService->listByFilters((object) array("filters" => null, "pageRequest" => null));
        $this->assertNotNull($datacentes);
        $this->assertTrue(count($datacentes) > 0);

        //Teste Remove
        try{
            $dataCenterService->remove($objDataCenter);
        }  catch(\Exception $e){
            $this->fail($e->getMessage());
        }
    }

}
 