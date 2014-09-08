<?php

namespace App\Bundle\CoreBundle\Controller;

use API\Bundle\CoreBundle\Service\RenderModuleService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class NavigationController extends Controller
{
    public function indexAction($module)
    {
        //TODO: Exception se n�o encontrar a p�gina!

        $render = new RenderModuleService($this->container);
        return $render->render('App'.ucfirst($module).'Bundle:Default:', array());

    }
}
