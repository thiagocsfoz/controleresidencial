<?php

namespace API\Bundle\CoreBundle\Controller;

use Doctrine\ORM\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class FrontArduinoController extends Controller
{
    /**
     * /broker URL
     *
     * @return Response
     */
    public function indexAction($id, $token)
    {
        try{
            if($this->verifyApp($id, $token)){
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

                return new Response( $gateway->output()  );
            } else {
                return new Response( ('Acesso não permitido.') );
            }
        } catch (\Exception $e){
            return new Response(array("error" => $e->getMessage()) , 408 );
        }
    }

    private function verifyApp($id, $token){
        $statement = $this->get('doctrine')->getManager('api')->createQueryBuilder();

        $query = $statement
            ->select( 'obj' )
            ->from('API\Bundle\AdminBundle\Entity\Aplicacoes', 'obj')
            ->where('obj.id = ?1')
            ->andWhere('obj.token = ?2')
            ->setParameter(1, $id)
            ->setParameter(2, $token)
            ->getQuery()->getArrayResult();

        if(!empty($query)){
            $GLOBALS['app'] = $query[0];
        }

        return !empty($query);
    }
}
