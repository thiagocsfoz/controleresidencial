<?php

namespace Operadores\Bundle\AdminBundle\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Operadores\Bundle\CoreBundle\Entity\EnumType;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;


/*
*
* Além de estender da EnumType e ter que dar nome tanto a $name quanto aos $values
* vocÊ precisa defini-lo no config.yml abaixo de doctrine:dbal:types, Ex:
* types:
* 		tipo_campo_dinamico: Operadores\Bundle\AdminBundle\Entity\TipoCampoDinamico
*
* O nome do type e o $name tem que ser igual
* e na classe que ira utiliza-lo usar 'type="tipo_campo_dinamico"''
*/
class TipoNivelCritico extends EnumType
{

    protected $name = 'tipo_nivel_critico';
    protected $values = array('BAIXO', 'MEDIO', 'ALTO');

}

