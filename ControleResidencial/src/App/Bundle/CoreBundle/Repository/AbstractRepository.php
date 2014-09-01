<?php
/**
 * Created by PhpStorm.
 * User: thiago
 * Date: 15/05/14
 * Time: 09:51
 */

namespace App\Bundle\CoreBundle\Repository;

use App\Bundle\CoreBundle\Entity\AbstractEntity;
use Doctrine\ORM\EntityRepository;
use App\Bundle\CoreBundle\Entity\Paging\PageRequest;
use App\Bundle\CoreBundle\Entity\Paging\Page;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class AbstractRepository
 * @package Operadores\Bundle\CoreBundle\Repository
 */
abstract class AbstractRepository extends EntityRepository implements IRepository
{
    public function getContainer()
    {
        global $kernel;
        return $kernel->getContainer();
    }

    /**
     * @param AbstractEntity $entity
     * @return AbstractEntity
     */
    public function insert( AbstractEntity $entity )
    {
        $this->getEntityManager('app')->persist( $entity );
        $this->getEntityManager('app')->flush();
        return $entity;
    }

    /**
     * @param AbstractEntity $entity
     * @return AbstractEntity
     */
    public function update( AbstractEntity $entity )
    {
        $entity = $this->getEntityManager('app')->merge( $entity );
        $this->getEntityManager('app')->flush();
        return $entity;
    }

    /**
     * @param $id
     */
    public function remove( $id )
    {
        //FIXME Verificar se retorna null ou estoura expcetion
        $entity= $this->getEntityManager()->find( $this->getClassName(), $id );

        if ( $entity == null )
        {
            throw new \Exception( 'O identificador '.$id.' n�o foi encontrado para a entidade '.$this->getClassName(), 404 );
        }

        $this->getEntityManager('app')->remove( $entity );
        $this->getEntityManager('app')->flush();
        return $entity;
    }

    /**
     * @param $id
     * @return AbstractEntity
     */
    public function findById( $id )
    {
        //FIXME Verificar se retorna null ou estoura expcetion
        $entity = $this->getEntityManager('app')->find( $this->getClassName(), $id );

        if ( $entity == null )
        {
            throw new \Exception( 'O identificador '.$id.' não foi encontrado para a entidade '.$this->getClassName(), 404 );
        }

        return $entity;
    }

    /**
     * @param $id
     * @return AbstractEntity
     */
    public function listAll()
    {
        //FIXME Verificar se retorna null ou estoura expcetion

        $statement = $this->getEntityManager('app')->createQueryBuilder();

        $query = $statement
            ->select( 'obj' )
            ->from($this->getClassName(), 'obj');

        return $query->getQuery()->getArrayResult();
    }


    /**
     * @param array $filters
     * @param PageRequest $pageRequest
     * @return Page
     */
    public abstract function listByFilters( AbstractEntity $filters = null, PageRequest $pageRequest = null );
}