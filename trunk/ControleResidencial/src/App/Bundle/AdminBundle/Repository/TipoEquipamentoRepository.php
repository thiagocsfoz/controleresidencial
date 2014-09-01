<?php

namespace Operadores\Bundle\AdminBundle\Repository;

use Operadores\Bundle\AdminBundle\Entity\TipoEquipamento;
use Operadores\Bundle\CoreBundle\Entity\AbstractEntity;
use Operadores\Bundle\CoreBundle\Entity\Paging\Page;
use Operadores\Bundle\CoreBundle\Entity\Paging\PageRequest;
use Operadores\Bundle\CoreBundle\Repository\AbstractRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;

class TipoEquipamentoRepository extends AbstractRepository
{
    /**
     * @param array $filters
     * @param PageRequest $pageRequest
     * @return Page
     */
    public function listByFilters(AbstractEntity $filters = null, PageRequest $pageRequest = null)
    {
        // TODO: Implement listByFilters() method.
    }
}