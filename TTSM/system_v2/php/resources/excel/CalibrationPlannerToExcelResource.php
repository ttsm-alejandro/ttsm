<?php
    session_start();
    
    if( !isset( $_SESSION[ "user" ] ) ){
        header( "Location: ../../index.php" );
        exit();
    }
        
/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 * 
 * Description:
 *              This POST php file will send all the info in "sellproject" Table to an Excel file
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
    require "../../models/CalibrationPlannerModel.php";
    //services
    require "../../services/CalibrationPlannerService.php";
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


//Main DATA
$mainData = "";

//if all the security filters are pass
function returnDataGET( $link ){
    //in this point I have the same information as the Calibration Planner Modal
    $mainData = CalibrationPlannerService::getAll( $link );
}

//
function returnError(){
    echo Constants::$noAccess;
}  
    
//Style of Table Header
$tableHeaderStyle = 
            'background-color:'.Constants::$ttsmBlueColor.'; 
            color: white;';
    
//Style of STATUS
function getStatusStyle( $status ){
    $style = "";
    if( strcmp($status, "OK" ) == 0){
        $style = "text-align: center; background-color: green; color : white;";
    }
    if( strcmp($status, "CLOSE" ) == 0){
        $style = "text-align: center; background-color: yellow; color : black;";
    }
    if( strcmp($status, "PAST" ) == 0){
        $style = "text-align: center; background-color: red; color : white;";
    }
    return $style;
}

//
$filename ="calibration.xls";
    header('Content-type: application/ms-excel');
    header('Content-Disposition: attachment; filename='.$filename);

?>

<table>
	<tr style="<?php echo $tableHeaderStyle; ?>">
		<th>Company</th>
		<th>Serial Number</th>
		<th>Calibration Date</th>
		<th>Day Left</th>
		<th>Status</th>
	</tr>
        <tr>
            <td>
                
            <?php
                echo $mainData[0][0];

            ?>
            </td>
        </tr>
</table>