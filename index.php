<?php
/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/*
 * Register the IP and Date of the visit
 */
require "TTSM/system_v2/php/util/Constants.php";
$link = mysqli_connect( Constants::$host , Constants::$user, Constants::$pass, Constants::$dataBaseWebPage );
$requestAddr = $_SERVER["REMOTE_ADDR"];
$query = " INSERT INTO visitor (visitor_ip,date,comments) values ( '$requestAddr' , (SELECT now()) , '' ); ";
mysqli_query( $link , $query );

/*
 * Send to the index page
 */
header( 'Location: ./ES_index.php' );