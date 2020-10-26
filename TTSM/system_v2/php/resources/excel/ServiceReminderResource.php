<?php
    header( 'Access-Control-Allow-Origin: *' );
    header( 'Access-Control-Allow-Methods: POST, GET, DELETE, PUT' );
    header( 'Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization,Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type' );
    
/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 * 
 * Description:
 *              This "Resource" or "Rest Service" will prepare the Models, constants and services required according to 
 *          the request.
 * 
 *      Method GET:
 *              -no param -> getAll()
 *              -id -> getById()
 *      Method POST:
 */
    
//Prepare the connection and Security Filter
if( isset( $_GET[ "user" ] ) 
        && isset( $_GET[ "token" ] )
        ){
    //get the USER and TOKEN
    $user = $_GET[ "user" ];
    $token = $_GET[ "token" ];

    //prepare the connection
    importPhpFiles();
    $link = getLink( true );

    //Security filter
    if( Security::checkUserAndToken( $link , $user, $token ) ){
        
        mysqli_close( $link );
        
        $link = getLink();
        
        //GET
        if( $_SERVER["REQUEST_METHOD"] === "GET" ){ 
            //Util::insertBitacore( $link , $user, "Person GET request" );
            returnDataGET( $link ); 
        }
        
        //POST
        if( $_SERVER["REQUEST_METHOD"] === "POST" ){ 
            //Util::insertBitacore( $link , $user, "Person GET request" );
            returnDataPOST( $link ); 
        }
        mysqli_close( $link );
        
    //"user / token" are incorrect    
    }else{
        //Util::insertBitacore( $link , $user, "try to access but user/token not match" );
        returnError();
        mysqli_close( $link );
    }

//the requester didn't send "user / token"    
}else{
    require "../../util/Constants.php";
    require "../../util/Util.php";
    $link = getLink();
    //Util::insertBitacore( $link , "Anonimous" , "try to access but not send user/token" );
    mysqli_close( $link );
    returnError();
}
    
//import all the PHP files needed
function importPhpFiles(){
    //Constants and security
    require "../../util/Constants.php";
    require "../../util/Security.php";
    require "../../util/Util.php";
    //models
    require "../../models/ServiceReminderModel.php";
    //services
    require "../../services/ServiceReminderService.php";
}

//get the $link for the use of the SERVICES
function getLink( $isSecurity = false ){
    if( $isSecurity ){
        $link = mysqli_connect( Constants::$host , Constants::$user , Constants::$pass, Constants::$dataBaseAdministration );
    }else{
        $link = mysqli_connect( Constants::$host , Constants::$user , Constants::$pass, Constants::$dataBaseHitoshi );
    }
    return $link;
}

//if all the security filters are pass
function returnDataGET( $link ){
    if( isset( $_GET[ "id" ] ) ){
        $id = $_GET[ "id" ];
        echo json_encode( ServiceReminderService::getById( $link , $id ) );
    }else{
        echo json_encode( ServiceReminderService::getAll( $link ) );
    }
}

//if all the security filters are pass
function returnDataPOST( $link ){
    //get the data in the json
    $datos = json_decode(file_get_contents('php://input'),true);
    $newElement = new ServiceReminderModel(
            $datos["idSystem"],
            $datos["idComputer"],
            $datos["dateLastReminder"],
            $datos["comment"]
            );
    $returnInfo = ServiceReminderService::save( $link , $newElement );
    echo $returnInfo;
}

//
function returnError(){
    echo Constants::$noAccess;
}