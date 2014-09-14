<?php

namespace App\Bundle\ControleBundle\Entity;

use App\Bundle\CoreBundle\Entity\AbstractEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * Iluminacao
 *
 * @ORM\Table(name="perfil_iluminacao")
 * @ORM\Entity(repositoryClass="App\Bundle\ControleBundle\Repository\PerfilIluminacaoRepository")
 */
class PerfilIluminacao extends AbstractEntity
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
}
