<?php

namespace Operadores\Bundle\AdminBundle\Repository;

use Operadores\Bundle\CoreBundle\Entity\AbstractEntity;
use Operadores\Bundle\CoreBundle\Entity\Paging\Page;
use Operadores\Bundle\CoreBundle\Entity\Paging\PageRequest;
use Operadores\Bundle\CoreBundle\Repository\AbstractRepository;
use Doctrine\ORM\Query\Expr\Join;

class BlocoAtividadeRepository extends AbstractRepository {

    /**
     * @param array $filters
     * @param PageRequest $pageRequest
     * @return Page
     */
    public function listByFilters(AbstractEntity $filters = null, PageRequest $pageRequest = null)
    {
        try {
            $statement = $this->getEntityManager()->createQueryBuilder();

            $query = $statement
                ->select( 'ba, a' )
                ->from('Operadores\Bundle\AdminBundle\Entity\BlocoAtividade', 'ba')
                ->join('ba.atividade', 'a');

            $query = $query->where("ba.bloco = :bloco")
                ->setParameter('bloco', $filters);

            $atividades = array();
            foreach($query->getQuery()->getArrayResult() as $blocoAtividade){
                $atividades[] = (object) $blocoAtividade['atividade'];
            }

            return $atividades;
        } catch(\Exception $e){
            return $e->getMessage();
        }
    }
}