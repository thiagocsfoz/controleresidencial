<?php
/**
 * Created by PhpStorm.
 * User: thiago
 * Date: 09/06/14
 * Time: 10:36
 */

namespace Operadores\Bundle\AdminBundle\Repository;

use Operadores\Bundle\CoreBundle\Entity\AbstractEntity;
use Operadores\Bundle\CoreBundle\Entity\Paging\Page;
use Operadores\Bundle\CoreBundle\Entity\Paging\PageRequest;
use Operadores\Bundle\CoreBundle\Repository\AbstractRepository;

class BlocoDataCenterRepository extends AbstractRepository {

    /**
     * @param array $filters
     * @param PageRequest $pageRequest
     * @return Page
     */
    public function listByFilters(AbstractEntity $filters = null, PageRequest $pageRequest = null)
    {
        // TODO: Implement listByFilters() method.
    }


    public function listByBloco( $id )
    {
        $statement = $this->getEntityManager()->createQueryBuilder();

        $query = $statement->select( 'dca','b' )->from('Operadores\Bundle\AdminBundle\Entity\BlocoDataCenter', 'dca')
            ->join('dca.dataCenter', 'dc')
            ->join('dca.bloco', 'b');

        $query->where("dc.id = :dataCenter")->setParameter('dataCenter', $id);

        return $query->getQuery()->getArrayResult();
    }
}