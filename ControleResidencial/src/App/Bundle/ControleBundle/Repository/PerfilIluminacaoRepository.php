<?php

namespace App\Bundle\ControleBundle\Repository;

use App\Bundle\CoreBundle\Entity\AbstractEntity;
use App\Bundle\CoreBundle\Entity\Paging\Page;
use App\Bundle\CoreBundle\Entity\Paging\PageRequest;
use App\Bundle\CoreBundle\Repository\AbstractRepository;

class PerfilIluminacaoRepository extends AbstractRepository
{

    /**
     * @param array|\App\Bundle\CoreBundle\Entity\AbstractEntity $filters
     * @param PageRequest $pageRequest
     * @return Page
     */
    public function listByFilters(AbstractEntity $filters = null, PageRequest $pageRequest = null)
    {

    }
}