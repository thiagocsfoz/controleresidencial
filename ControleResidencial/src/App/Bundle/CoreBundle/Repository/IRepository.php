<?php
namespace App\Bundle\CoreBundle\Repository;

use App\Bundle\CoreBundle\Entity\AbstractEntity;
use App\Bundle\CoreBundle\Entity\Paging\PageRequest;
use App\Bundle\CoreBundle\Entity\Paging\Page;

/**
 * Interface IRepository
 * @package App\Bundle\CoreBundle\Repository
 */
interface IRepository
{
    /**
     * @param AbstractEntity $entity
     * @return AbstractEntity
     */
    public function insert( AbstractEntity $entity );
    /**
     * @param AbstractEntity $entity
     * @return AbstractEntity
     */
    public function update( AbstractEntity $entity );

    /**
     * @param $entityName
     * @param $id
     */
    public function remove( $id );

    /**
     * @param $id
     * @return AbstractEntity
     */
    public function findById( $id );

    /**
     * @param $filters
     * @param PageRequest $pageRequest
     * @return Page
     */
    public function listByFilters( AbstractEntity $filters = null, PageRequest $pageRequest = null );
}