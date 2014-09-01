<?php

namespace API\Bundle\ComunicationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('APIComunicationBundle:Default:index.html.twig', array('name' => $name));
    }
}
