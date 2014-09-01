<?php
/**
 * Created by PhpStorm.
 * User: Thiago
 * Date: 23/06/14
 * Time: 09:22
 */

namespace Operadores\Bundle\AdminBundle\Tests\Service;


use Operadores\Bundle\AdminBundle\Entity\Bloco;
use Operadores\Bundle\AdminBundle\Entity\Template;
use Operadores\Bundle\AdminBundle\Service\BlocoService;
use Operadores\Bundle\AdminBundle\Service\TemplateService;
use Operadores\Bundle\CoreBundle\Tests\AbstractTestCase;

class TemplateServiceTest extends AbstractTestCase {

    public function testCrud() {

        //Services
        $templateService = new TemplateService($this->getContainer());
        $blocoService    = new BlocoService($this->getContainer());

        //Test Insert
        $objTemplate = new Template();
        $objTemplate->nomePortugues = "Nome template Português";
        $objTemplate->nomeEspanhol  = "Nome template Espanhol";
        $objTemplate->validoPortugues = true;
        $objTemplate->validoEspanhol  = true;

        $bloco = new Bloco();
        $bloco->id = 1;
        $objTemplate->blocos[] = $blocoService->findById($bloco);

        $returnTemplate = $templateService->insert($objTemplate);

        $this->assertNotNull($returnTemplate->id);
        $this->assertEquals('Nome template Português', $returnTemplate->nomePortugues);
        $this->assertEquals('Nome template Espanhol', $returnTemplate->nomeEspanhol);
        $this->assertEquals(true, $returnTemplate->validoPortugues);
        $this->assertEquals(true, $returnTemplate->validoEspanhol);


        //Test Update
        $objTemplate = new Template();
        $objTemplate->id = 1;

        $objTemplateUpdate = $templateService->findById($objTemplate);

        $objTemplateUpdate->nomePortugues = "Nome Update";
        $objTemplateUpdate->nomeEspanhol  = "Nome Update";

        $objTemplateUpdate = $templateService->update($objTemplateUpdate);

        $this->assertNotNull($objTemplateUpdate->id);
        $this->assertEquals("Nome Update", $objTemplateUpdate->nomePortugues);
        $this->assertEquals("Nome Update", $objTemplateUpdate->nomeEspanhol);

        //Test List All
        $templates = $templateService->listAll();
        $this->assertNotNull($templates);
        $this->assertTrue(count($templates) > 0);

        //Test List By filter
        $templates = $templateService->listByFilters((object) array("filters" => null, "pageRequest" => null));
        $this->assertNotNull($templates);
        $this->assertTrue(count($templates) > 0);

        //Test Remove
        try{
            $templateService->remove($objTemplate);
        }  catch(\Exception $e){
            $this->fail($e->getMessage());
        }

    }

}
 