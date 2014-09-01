<?php
/**
 * Created by PhpStorm.
 * User: Gustavo
 * Date: 25/06/14
 * Time: 10:52
 */

namespace Operadores\Bundle\AdminBundle\Tests\Service;
use Operadores\Bundle\AdminBundle\Entity\DataCenter;
use Operadores\Bundle\AdminBundle\Entity\Equipamento;
use Operadores\Bundle\AdminBundle\Entity\TipoEquipamento;
use Operadores\Bundle\AdminBundle\Service\DataCenterService;
use Operadores\Bundle\AdminBundle\Service\EquipamentoService;
use Operadores\Bundle\AdminBundle\Service\TipoEquipamentoService;
use Operadores\Bundle\CoreBundle\Tests\AbstractTestCase;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\DateTime;

class EquipamentoServiceTest extends AbstractTestCase {

    //DEFINIÇÃO DO TESTE
    public function testCrud()
    {
        //SERVIÇOS
        $equipamentoService = new EquipamentoService($this->getContainer());
        $dataCenterService = new DataCenterService($this->getContainer());
        $tipoEquipamentoService = new TipoEquipamentoService($this->getContainer());

        //OBJETOS
        $equipamento = new Equipamento();
        $dataCenter = new DataCenter();
        $tipoEquipamento = new TipoEquipamento();

        //DATE
        $equipamento->dataInicioContrato = new \DateTime();
        $equipamento->dataFimContrato = new \DateTime();
        $equipamento->dataInstalacao = new \DateTime();

        //STRING
        $equipamento->fabricante = "fabricante";
        $equipamento->empresa = "empresa";
        $equipamento->modelo = "modelo";
        $equipamento->rack = "rack";
        $equipamento->sala = "sala";
        $equipamento->numeroContrato = "numeroContrato";
        $equipamento->numeroSerie = "numeroSerie";
        $equipamento->smap = "smap";

        //INT
        $equipamento->bp = 123456789;

        //ENUM
        $equipamento->margem = "ESQUERDA";
        $equipamento->tipoContrato = "GARANTIA";

        $equipamento->status = true;

        //DATACENTER
        $dataCenter->id = 1;
        $equipamento->dataCenter = $dataCenterService->findById($dataCenter);

        //TIPO EQUIPAMENTO
        $tipoEquipamento->id = 1;
        $equipamento->tipoEquipamento = $tipoEquipamentoService->findById($tipoEquipamento);

        //CAMPOS DINAMICOS
        $equipamento->campoDinamico = Array();

        //IMAGENS
        $equipamento->images = Array();

        //INSERT
        $equipamento = $equipamentoService->insert($equipamento);
        $this->assertNotNull($equipamento->id);
        $this->assertEquals('fabricante', $equipamento->fabricante);
        $this->assertEquals('empresa', $equipamento->empresa);
        $this->assertEquals('sala', $equipamento->sala);
        $this->assertEquals('rack', $equipamento->rack);
        $this->assertEquals('modelo', $equipamento->modelo);
        $this->assertEquals('smap', $equipamento->smap);
        $this->assertEquals('numeroSerie', $equipamento->numeroSerie);
        $this->assertEquals('numeroContrato', $equipamento->numeroContrato);

        $equipamentoToUpdate = $equipamento;
        $equipamentoToUpdate->modelo = "modelo atualizado";

        //CAMPOS DINAMICOS
        $equipamentoToUpdate->campoDinamico = Array();

        //IMAGENS
        $equipamentoToUpdate->images = Array();

        $equipamentoToUpdate = $equipamentoService->update($equipamentoToUpdate);

        $this->assertEquals('modelo atualizado', $equipamentoToUpdate->modelo);

        //LIST ALL
        $equipamentos = $equipamentoService->listAll();
        $this->assertNotNull($equipamentos);
        $this->assertTrue(count($equipamentos) > 0);

        //LIST BY FILTERS WITH OBJECT
        $filter = new Equipamento();
        $equipamentos = $equipamentoService->listByFilters((object) array("filters" => $filter, "pageRequest" => null));
        $this->assertNotNull($equipamentos);
        $this->assertTrue(count($equipamentos) > 0);

        //LIST BY FILTERS WITHOUT OBJECT
        $equipamentos = $equipamentoService->listByFilters((object) array("filters" => null, "pageRequest" => null));
        $this->assertNotNull($equipamentos);
        $this->assertTrue(count($equipamentos) > 0);

        $equipamentoToRemove = $equipamentoToUpdate;

        //Test Remove
        try{
            $equipamentoService->remove($equipamentoToRemove);
        }  catch(\Exception $e){
            $this->fail($e->getMessage());
        }
    }
}
 