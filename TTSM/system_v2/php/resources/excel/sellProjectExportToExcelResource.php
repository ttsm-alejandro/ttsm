<?php
    session_start();
    if( !isset( $_SESSION[ "user" ] ) ){
        header( "Location: ../../index.php" );
    }
    
/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 * 
 * Description:
 *              This POST php file will send all the info in "sellproject" Table to an Excel file
 */
    
    //prepare the connection
    importPhpFiles();
    $link = getLink();

    //Security filter
    //Util::insertBitacore( $link , $user, "SellProject Excel request" );
	
	 
    
//import all the PHP files needed
function importPhpFiles(){
    //Constants and security
    require "../../util/Constants.php";
}

//get the $link for the use of the SERVICES
function getLink(){
    $link = mysqli_connect( Constants::$host , Constants::$user , Constants::$pass, Constants::$dataBase );
    return $link;
}

//
function returnError(){
    echo Constants::$noAccess;
}

//
$filename ="document_name.xls";
    header('Content-type: application/ms-excel');
    header('Content-Disposition: attachment; filename='.$filename);

?>

<table>
	<tr>
		<th>Company Name</th>
		<th>Plant</th>
		<th>Url</th>
		<th>State</th>
		<th>Address</th>
		<th>Supply Record In Japan</th>
		<th>Supply Record In Mexico</th>
		<th>Application</th>
		<th>Measuring Work</th>
		<th>Division</th>
		<th>Person in Charge</th>
		<th>Phone number</th>
		<th>e-mail</th>
		<th>Target product</th>
		<th>Position</th>
		<th>Mobile phone</th>
		<th>Memo</th>
	</tr>
	<?php
		$query = "SELECT 
						companyName, 
						plant, 
						url, 
						state, 
						address, 
						supplyRecordInJapan, 
						supplyInMexico, 
						application, 
						measuringWork,
						division,
						personInCharge,
						phoneNumber,
						email,
						targetProduct,
						position,
						mobilePhone,
						memo
					FROM 
						sellproject";
		$result = mysqli_query( $link , $query );
		
		while( $row = mysqli_fetch_row( $result ) ){
			echo "<tr><td>"
					.$row[0]."</td><td>"
					.$row[1]."</td><td>"
					.$row[2]."</td><td>"
					.$row[3]."</td><td>"
					.$row[4]."</td><td>"
					.$row[5]."</td><td>"
					.$row[6]."</td><td>"
					.$row[7]."</td><td>"
					.$row[8]."</td><td>"
					.$row[9]."</td><td>"
					.$row[10]."</td><td>"
					.$row[11]."</td><td>"
					.$row[12]."</td><td>"
					.$row[13]."</td><td>"
					.$row[14]."</td><td>"
					.$row[15]."</td><td>"
					.$row[16]."</td></tr>";
		}
	?>

</table>


