<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Description of personService:
 *          Service for "SMC Planner"
 *
 * @author alejandro aguayo
 */
class SMCPlannerService {
    
    //get all
    static function getAll( $link ){
        $query = "  SELECT 
                        company.short_name,
                        plant.name,
                        department.name,
                        person.name,
                        person.email,
                        system.serial_number,
                        computer.service_tag,
                        computer.software_array
                    FROM
                        company,
                        plant,
                        department,
                        person,
                        system,
                        machine,
                        computer   
                    WHERE
                        ( machine.id_system = system.id )
                        AND ( machine.id_computer = computer.id )
                        AND ( system.id_company = company.id )
                        AND ( system.id_plant = plant.id )
                        AND ( system.id_department = department.id )
                        AND ( person.id = department.id_person )
                        AND ( computer.service_tag != '00 - No Computer' )
                    GROUP BY
                        computer.service_tag
                    ORDER BY
                        company.short_name";
                
        //echo $query."<br>";
        $result = mysqli_query( $link , $query );
        return SMCPlannerService::getArrayByResult( $result , $link );
    }
    
    //transform a $row into a $object
    static function getElementByRow( $row ){
        /*
        for( $index = 0 ; $index <=8 ; $index++ ){
            echo "<br>row[" . $index . "]=" . $row[ $index ];
        }
         * 
         */
        
    //    
    $newRow = new SMCPlannerModel( 
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                $row[4],
                $row[5],
                $row[6],
                $row[7],
                $row[8],
                $row[9]
                );
        return $newRow;
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result , $link ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            /*
             * row[0] to $row[6] pass equal
             */
            
            /*
               var $companyName;                   0       company.short_name
               var $plantName;                     1       plant.name
               var $departmentName;                2       department.name
               var $personName;                    3       person.name
               var $personEmail;                   4       person.email
               var $systemSerialNumber;            5       system.serial_number
               var $computerServiceTag             6       computer.service_tag
               var $idSoftware;                    7       computer.software_array
               var $dongle;                        8       
               var $expirationDate;                9       
             *  
             * get software name using $row[7] that contains "computer.software_array"
             * 
             * software_array example: 
             *      11,2016.1,51612,,Invalid Date,Fri Mar 12 2010 00:00:00 GMT-0600 (hora estándar central),;
             * 
             * explanation:
             *      idSoftware:         11,
             *      version:            2016.1,
             *      dongle:             51612,
             *      version dongle:     '',
             *      installationDate:   Invalid Date,
             *      expiration Date:    Fri Mar 12 2010 00:00:00 GMT-0600 (hora estándar central), ;
             *      
             *  
             */
            
            //number of different software installed
            $listSoftwareArray = explode( ";" , $row[7] );
            
            $index = 0;
            while( isset( $listSoftwareArray[ $index ] ) ){
                $oneSoftwareArray = $listSoftwareArray[ $index ];
                $itemSoftware = explode( "," , $oneSoftwareArray );
                
                //
                if( sizeof( $itemSoftware ) >= 7 ){
                    //software id
                    $row[7] = $itemSoftware[ 0 ];

                    //dongle
                    $row[8] = $itemSoftware[ 2 ] . " version " . $itemSoftware[3];

                    //expirationDate
                    $row[9] = $itemSoftware[5];
                    
                    $newRow = SMCPlannerService::getElementByRow( $row );
                    $arrayResult->append( $newRow );
                }
                
                $index++;
            }
        }
        return $arrayResult;
    }
}