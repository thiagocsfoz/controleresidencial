<?php

namespace App\Bundle\ControleBundle\Entity;

use App\Bundle\CoreBundle\Entity\AbstractEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * Iluminacao
 *
 * @ORM\Table(name="iluminacao")
 * @ORM\Entity(repositoryClass="App\Bundle\ControleBundle\Repository\IluminacaoRepository")
 */
class Iluminacao extends AbstractEntity
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
     * @ORM\Column(name="nome", type="string", length=255)
     */
    public $nome;

    /**
     * @var integer
     *
     * @ORM\Column(name="porta", type="integer")
     */
    public $porta;

    /**
     * @var boolean
     *
     * @ORM\Column(name="status", type="boolean")
     */
    public $status;
}
