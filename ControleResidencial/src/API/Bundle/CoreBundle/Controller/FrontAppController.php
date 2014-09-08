<?php

namespace API\Bundle\CoreBundle\Controller;

use Doctrine\ORM\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class FrontAppController extends Controller
{
    /**
     * /broker URL
     *
     * @return Response
     */
    public function indexAction()
    {
        $config = new \Amfphp_Core_Config();

        //--Search Path das Entidades
        $voFolders = array();
        $dir = dirname(__FILE__) . '/../../';
        if ($dh = opendir($dir)) {
            while (($file = readdir($dh)) !== false) {
                if(strpos($file, ".") === false)
                    $voFolders[] = array(dirname(__FILE__) . '/../../'.$file.'/Entity/', 'API\\Bundle\\'.$file.'\\Entity');
            }
            closedir($dh);
        }
        $config->pluginsConfig["AmfphpVoConverter"] = array('voFolders' => $voFolders, 'enforceConversion' => true);

        //--Error
        $voFolders[] = array(dirname(__FILE__) . '/../Entity/Error/', 'API\\Bundle\\CoreBundle\\Entity\\Error');
        //--Paging
        $voFolders[] = array(dirname(__FILE__) . '/../Entity/Paging/', 'API\\Bundle\\CoreBundle\\Entity\\Paging');


        $config->pluginsConfig["AmfphpVoConverter"] = array('voFolders' => $voFolders);

        //--Search Path dos Servi�os
        foreach(glob(dirname(__FILE__) . '/../../*', GLOB_ONLYDIR) as $dir) {
            $bundle = explode("/", $dir);
            $bundle = $bundle[count($bundle)-1];
            $config->serviceFolders[] = array($dir.'/Service/', 'API\\Bundle\\'.$bundle.'\\Service');
        }

        //$config->serviceFolders[] = array($dir.'CoreBundle/Service/', 'Operadores\\Bundle\\CoreBundle\\Service');
        //$config->serviceFolders[] = array($dir.'AdminBundle/Service/', 'Operadores\\Bundle\\AdminBundle\\Service');

        $gateway = \Amfphp_Core_HttpRequestGatewayFactory::createGateway($config);
        $gateway->service();

        //var_dump("dsadssadsa");
        //exit;

        return new Response( $gateway->output() );
    }
}
