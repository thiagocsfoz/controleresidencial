<?php

namespace API\Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use API\Bundle\CoreBundle\Entity\AbstractEntity;

/**
 * Aplicacoes
 *
 * @ORM\Table(name="Aplicacoes")
 * @ORM\Entity(repositoryClass="API\Bundle\AdminBundle\Repository\AplicacoesRepository")
 */
class Aplicacoes extends AbstractEntity
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nome", type="text")
     */
    public $nome;

    /**
     * @var string
     *
     * @ORM\Column(name="ip", type="text")
     */
    public $ip;

    /**
     * @var string
     *
     * @ORM\Column(name="token", type="string")
     */
    public $token;

}
