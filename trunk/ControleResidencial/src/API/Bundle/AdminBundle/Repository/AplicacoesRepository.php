<?php

namespace API\Bundle\AdminBundle\Repository;

use API\Bundle\CoreBundle\Entity\AbstractEntity;
use API\Bundle\CoreBundle\Entity\Paging\Page;
use API\Bundle\CoreBundle\Entity\Paging\PageRequest;
use API\Bundle\CoreBundle\Repository\AbstractRepository;
use Symfony\Component\HttpFoundation\Response;

class AplicacoesRepository extends AbstractRepository
{

    /**
     * @param array|\API\Bundle\CoreBundle\Entity\AbstractEntity $filters
     * @param PageRequest $pageRequest
     * @return Page
     */
    public function listByFilters(AbstractEntity $filters = null, PageRequest $pageRequest = null)
    {

    }

}