<?php

namespace Operadores\Bundle\AdminBundle\Repository;

use Operadores\Bundle\CoreBundle\Entity\AbstractEntity;
use Operadores\Bundle\CoreBundle\Entity\Paging\Page;
use Operadores\Bundle\CoreBundle\Entity\Paging\PageRequest;
use Operadores\Bundle\CoreBundle\Repository\AbstractRepository;
use Operadores\Bundle\AdminBundle\Entity\AtividadeCondicional;

class AtividadeCondicionalRepository extends AbstractRepository
{

    /**
     * @param array|\Operadores\Bundle\CoreBundle\Entity\AbstractEntity $filters
     * @param PageRequest $pageRequest
     * @return Page
     */
    public function listByFilters(AbstractEntity $filters = null, PageRequest $pageRequest = null)
    {
        /*$statement = $this->getEntityManager()->createQueryBuilder();

        $query = $statement
            ->select( 'at' )
            ->from($filters::$NAME, 'at');

        $query = $query->where("at.descricaoPortugues LIKE :descricaoPortugues")
                    ->andWhere("at.descricaoEspanhol LIKE :descricaoEspanhol")
                    ->setParameter('descricaoPortugues', '%'. $filters->descricaoPortugues .'%')
                    ->setParameter('descricaoEspanhol', '%'. $filters->descricaoEspanhol .'%');

        if($filters->tipo != "")
            $query = $query->andWhere("at.tipo = :tipo")->setParameter('tipo', $filters->tipo);

        if($filters->nivelCritico != "")
            $query = $query->andWhere("at.nivelCritico = :nivelCritico")->setParameter('nivelCritico', $filters->nivelCritico);


        $pageRequest->pagination( $query );

        $statement
            ->setFirstResult( ($pageRequest->page->page * $pageRequest->page->range) - $pageRequest->page->range)
            ->setMaxResults($pageRequest->page->range);

        $query->orderBy('at.'.$pageRequest->sort->property, $pageRequest->sort->direction);


        $pageRequest->page->content = $query->getQuery()->getArrayResult();

        foreach ($pageRequest->page->content as &$atividade){
            $atividade['estaSendoUsado'] = true;
        }
        */
        return false;
    }
}