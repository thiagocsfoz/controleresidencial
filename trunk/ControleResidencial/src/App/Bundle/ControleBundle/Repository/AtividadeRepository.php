<?php

namespace Operadores\Bundle\AdminBundle\Repository;

use Operadores\Bundle\CoreBundle\Entity\AbstractEntity;
use Operadores\Bundle\CoreBundle\Entity\Paging\Page;
use Operadores\Bundle\CoreBundle\Entity\Paging\PageRequest;
use Operadores\Bundle\CoreBundle\Repository\AbstractRepository;
use Symfony\Component\HttpFoundation\Response;
use Operadores\Bundle\CoreBundle\Entity\Error\Error;

class AtividadeRepository extends AbstractRepository
{

    /**
     * @param array|\Operadores\Bundle\CoreBundle\Entity\AbstractEntity $filters
     * @param PageRequest $pageRequest
     * @return Page
     */
    public function listByFilters(AbstractEntity $filters = null, PageRequest $pageRequest = null)
    {
        try {
            $statement = $this->getEntityManager()->createQueryBuilder();

            $query = $statement
                ->select( 'at' )
                ->from('Operadores\Bundle\AdminBundle\Entity\Atividade' , 'at');

            if($filters != null) {
                $query = $query->where("upper(at.descricaoPortugues) LIKE :descricaoPortugues")
                    ->andWhere("upper(at.descricaoEspanhol) LIKE :descricaoEspanhol")
                    ->setParameter('descricaoPortugues', '%'. strtoupper($filters->descricaoPortugues) .'%')
                    ->setParameter('descricaoEspanhol', '%'. strtoupper($filters->descricaoEspanhol) .'%');

                if($filters->tipo != "")
                    $query = $query->andWhere("at.tipo = :tipo")->setParameter('tipo', $filters->tipo);

                if($filters->nivelCritico != "")
                    $query = $query->andWhere("at.nivelCritico = :nivelCritico")->setParameter('nivelCritico', $filters->nivelCritico);

                if($filters->lang == '.br'){
                    $query = $query->andWhere("at.descricaoPortugues <> ''");
                    if($pageRequest->sort->property == 'id'){
                        $pageRequest->sort->property = 'descricaoPortugues';
                    }
                } else {
                    $query = $query->andWhere("at.descricaoEspanhol <> ''");
                    if($pageRequest->sort->property == 'id'){
                        $pageRequest->sort->property = 'descricaoEspanhol';
                    }
                }
            }

            if ($pageRequest != null) {
                $pageRequest->pagination( $query );

                $query
                    ->setFirstResult( ($pageRequest->page->page * $pageRequest->page->range) - $pageRequest->page->range)
                    ->setMaxResults($pageRequest->page->range);

                $query->orderBy('at.'.$pageRequest->sort->property, $pageRequest->sort->direction);

                $pageRequest->page->content = $query->getQuery()->getArrayResult();

                foreach($pageRequest->page->content as &$atividade){
                    $statement = $this->getEntityManager()->createQueryBuilder();
                    $query = $statement
                        ->select('a', 'rta' )
                        ->from('Operadores\Bundle\ChecklistBundle\Entity\RegistroTurnoAtividade', 'rta')
                        ->join('rta.atividade', 'a')
                        ->where('a.id = :atividade')->setParameter('atividade', $atividade['id'])
                        ->getQuery()->getArrayResult();

                    $atividade['estaSendoUsado'] = !empty($query);
                }

            } else {
                $pageRequest = (object) array("page" => (object) array("content" => $query->getQuery()->getArrayResult()));
            }
/*
            foreach ($pageRequest->page->content as &$atividade){
                $atividade['estaSendoUsado'] = false;
            }*/

            return $pageRequest;

        } catch (\Exception $e){
            return new Error($e->getMessage());
        }
    }

    public function listAllActive()
    {
        try {
            $statement = $this->getEntityManager()->createQueryBuilder();

            $query = $statement
                ->select( 'at' )
                ->from('Operadores\Bundle\AdminBundle\Entity\Atividade' , 'at');
                $query = $query->andWhere("at.status = true");

            return $query->getQuery()->getArrayResult();

        } catch(\Exception $e){
            return new Response($e->getCode() , $e->getMessage());
        }
    }

    public function findById($id){
        $entity = $this->getEntityManager()->find( 'Operadores\Bundle\AdminBundle\Entity\Atividade', $id );

        if ( $entity == null )
        {
            throw new \Exception( 'O identificador '.$id.' não foi encontrado para a entidade '.$this->getClassName(), 404 );
        }

        $statement = $this->getEntityManager()->createQueryBuilder();
        $query = $statement
            ->select('a', 'rta' )
            ->from('Operadores\Bundle\ChecklistBundle\Entity\RegistroTurnoAtividade', 'rta')
            ->join('rta.atividade', 'a')
            ->where('a.id = :atividade')->setParameter('atividade', $entity->id)
            ->getQuery()->getArrayResult();

        $entity->estaSendoUsado = !empty($query);

        return $entity;
    }

}