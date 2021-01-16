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
        
        //$table = $_GET[ "table" ];
        
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
    require "../../models/InventoryPageModel.php";
    //services
    require "../../services/InventoryPageService.php";
}

//get the $link for the use of the SERVICES
function getLink( $isSecurity = false ){
    $link = mysqli_connect( Constants::$host , Constants::$user , Constants::$pass, Constants::$dataBaseAdministration );
    /*if( $isSecurity ){
        $link = mysqli_connect( Constants::$host , Constants::$user , Constants::$pass, Constants::$dataBaseAdministration );
    }else{
        $link = mysqli_connect( Constants::$host , Constants::$user , Constants::$pass, Constants::$dataBaseWebPage );
    }*/
    return $link;
}

//if all the security filters are pass
function returnDataGET( $link ){
    //si mandan id, es por que solicitan "actualizar el estatus" o "borrar" un registro
    if( isset( $_GET[ "id" ] ) ){
        $id = $_GET[ "id" ];
        //actualizar estatus
        if( isset( $_GET[ "status"] ) ){
            $checked = $_GET[ "status" ];
            echo InventoryPageService::setChecked( $link , $id , $checked );
        }
        //borrar registro
        if( isset( $_GET[ "delete" ] ) ){
            echo InventoryPageService::delete( $link , $id );
        }
        
    //si no mandan id, es que estan solicitando toda la tabla
    }else{ 
        echo json_encode( InventoryPageService::getAll( $link ) );
    }
}

//if all the security filters are pass
//si mandan por medio de POST, estan solicitando agregar un nuevo registro
function returnDataPOST( $link ){
    $datos = json_decode(file_get_contents('php://input'),true);
    $newElement = new InventoryPageModel(
            $datos["id"],
            $datos["link"],
            $datos["partNumber"],
            $datos["description"],
            $datos["type"],
            $datos["localization"],
            $datos["unit"],
            $datos["stock"],
            $datos["checked"]
            );
    $returnInfo = InventoryPageService::save( $link , $newElement );
    echo $returnInfo;
    //echo json_encode( InventoryPageService::getAll( $link ) );
}

//
function returnError(){
    echo Constants::$noAccess;
}