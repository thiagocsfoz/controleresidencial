<?php

/* 
V4.80 8 Mar 2006  (c) 2000-2007 John Lim (jlim#natsoft.com.my). All rights reserved.
  Released under both BSD license and Lesser GPL library license. 
  Whenever there is any discrepancy between the two licenses, 
  the BSD license will take precedence. 
  Set tabs to 4 for best viewing.
	
  Latest version is available at http://adodb.sourceforge.net
*/

function NotifyExpire($ref,$key)
{
	print "<p><b>Notify Expiring=$ref, sessionkey=$key</b></p>";
}

//-------------------------------------------------------------------
	
error_reporting(E_ALL);


ob_start();
include('../session/adodb-cryptsession2.php');

$options['debug'] = 99;
$db = 'postgres';

#### CONNECTION
switch($db) {
case 'oci8': 
	$options['table'] = 'adodb_sessions2';
	ADOdb_Session::config('oci8', '', 'jcollect', 'natsoft', '',$options);
	break;

case 'postgres':
	ADOdb_Session::config('postgres', 'localhost', 'tester', 'test', 'test',$options);
	break;
	
case 'mysql':
default:
	ADOdb_Session::config('mysql', 'localhost', 'root', '', 'xphplens_2',$options);
	break;


}
	

	
#### SETUP NOTIFICATION
	$USER = 'JLIM'.rand();
	$ADODB_SESSION_EXPIRE_NOTIFY = array('USER','NotifyExpire');