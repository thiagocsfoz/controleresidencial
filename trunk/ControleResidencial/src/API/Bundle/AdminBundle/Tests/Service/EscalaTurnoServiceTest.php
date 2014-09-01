<?php

namespace Operadores\Bundle\AdminBundle\Tests\Service;

use Operadores\Bundle\AdminBundle\Entity\ConfiguracaoBlocoTemplateEscalaTurno;
use Operadores\Bundle\AdminBundle\Entity\ConfiguracaoTemplateEscalaTurno;
use Operadores\Bundle\AdminBundle\Entity\EscalaTurno;
use Operadores\Bundle\AdminBundle\Entity\Template;
use Operadores\Bundle\AdminBundle\Entity\Bloco;
use Operadores\Bundle\AdminBundle\Service\EscalaTurnoService;
use Operadores\Bundle\AdminBundle\Service\BlocoService;
use Operadores\Bundle\AdminBundle\Service\TemplateService;
use Operadores\Bundle\CoreBundle\Tests\AbstractTestCase;

class EscalaTurnoServiceTest extends AbstractTestCase {
    public function testCrud()
    {
        //SERVIÇOS
        $escalaTurnoService = new EscalaTurnoService($this->getContainer());
        $blocoService = new BlocoService($this->getContainer());
        $templateService = new TemplateService($this->getContainer());


        //OBJETOS
        $escalaTurno = new EscalaTurno();
        $template = new Template();
        $bloco = new Bloco();
        $configuracaoTemplateEscalaTurno = new ConfiguracaoTemplateEscalaTurno();
        $configuracaoBlocoTemplateEscalaTurno = new ConfiguracaoBlocoTemplateEscalaTurno();


        //DATE
        $escalaTurno->dataInicioTurno = new \DateTime();
        $escalaTurno->dataFimTurno = new \DateTime();

        //STRING
        $escalaTurno->nomePortugues = "nomePortugues";
        $escalaTurno->nomeEspanhol = "nomeEspanhol";
        $escalaTurno->tipo = "tipo";
        $escalaTurno->validoPortugues = true;
        $escalaTurno->validoEspanhol = true;

        //STRING
        $configuracaoTemplateEscalaTurno->template = $template;
        $configuracaoTemplateEscalaTurno->escalaTurno = $escalaTurno;

        //DATE
        $configuracaoTemplateEscalaTurno->horaInicio =  new \DateTime();
        $configuracaoTemplateEscalaTurno->horaFim =  new \DateTime();

        //FindByID
        $template->id = 1;
        $template = $templateService->findById($template);
        $bloco->id = 1;
        $bloco = $blocoService->findById($bloco);

        $configuracaoBlocoTemplateEscalaTurno->bloco = $bloco;
        $configuracaoBlocoTemplateEscalaTurno->template = $template;
        $configuracaoBlocoTemplateEscalaTurno->escalaTurno = $escalaTurno;
        $configuracaoBlocoTemplateEscalaTurno->escalaTurnoTemplate = $configuracaoTemplateEscalaTurno;

        //STRING
        $configuracaoBlocoTemplateEscalaTurno->tipoHorario = 'PADRAO';

        if( $configuracaoBlocoTemplateEscalaTurno->tipoHorario == 'FIXO' ) {
            $configuracaoBlocoTemplateEscalaTurno->horaExecucao = new \DateTime();
        } else if($configuracaoBlocoTemplateEscalaTurno->tipoHorario == 'INTERVALO') {
            $configuracaoBlocoTemplateEscalaTurno->intervaloRepeticao = 2;
        }

        //INSERT
        $escalaTurno = $escalaTurnoService->insert($escalaTurno);
        $this->assertNotNull($escalaTurno->id);
        $this->assertEquals('nomePortugues', $escalaTurno->nomePortugues);
        $this->assertEquals('nomeEspanhol', $escalaTurno->nomeEspanhol);
        $this->assertEquals('tipo', $escalaTurno->tipo);
        $this->assertEquals(true, $escalaTurno->validoPortugues);
        $this->assertEquals(true, $escalaTurno->validoEspanhol);

        $escalaTurnoToUpdate = $escalaTurno;
        $escalaTurnoToUpdate->nomePortugues = "nomePortugues atualizado";

        //LIST ALL
        $escalaTurno = $escalaTurnoService->listAll();
        $this->assertNotNull($escalaTurno);
        $this->assertTrue(count($escalaTurno) > 0);

        //LIST BY FILTERS WITH OBJECT
        $filter = new EscalaTurno();
        $escalaTurno = $escalaTurnoService->listByFilters((object) array("filters" => $filter, "pageRequest" => null));
        $this->assertNotNull($escalaTurno);
        $this->assertTrue(count($escalaTurno) > 0);

        //LIST BY FILTERS WITHOUT OBJECT
        $escalaTurno = $escalaTurnoService->listByFilters((object) array("filters" => null, "pageRequest" => null));
        $this->assertNotNull($escalaTurno);
        $this->assertTrue(count($escalaTurno) > 0);

        $escalaTurnoToRemove = $escalaTurnoToUpdate;

        //Test Remove
        try{
            $escalaTurnoService->remove($escalaTurnoToRemove );
        }  catch(\Exception $e){
            $this->fail($e->getMessage());
        }
    }
}