<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Description of personService:
 *          Service for "Calibration Planner"
 *
 * @author alejandro aguayo
 */
class ServiceReminderService {
    
    //get all
    static function getAll( $link ){
        $query = " SELECT 
                    (SELECT serial_number FROM system WHERE id=service_reminder.id_system),
                    (SELECT service_tag FROM computer WHERE id=service_reminder.id_computer),
                    date_last_reminder
                FROM
                    service_reminder";
                
        //echo $query."<br>";
        $result = mysqli_query( $link , $query );

        return ServiceReminderService::getArrayByResult( $result );
    }
    
    //update
    static function save( $link , $newElement ){
        $today = getdate();
        $query = "";
        //Update idSystem
        if( $newElement-> idComputer == "-1" ){
            $query = "SELECT * FROM service_reminder WHERE id_system = (SELECT id FROM system WHERE serial_number='$newElement->idSystem')";
            if( mysqli_num_rows( mysqli_query( $link , $query ) ) <= 0 ){
                $query = "INSERT INTO service_reminder VALUES ( (SELECT id FROM system WHERE serial_number='$newElement->idSystem') , -1 , '$today[mday]-$today[month]-$today[year]' )";
            }else{
                $query = "UPDATE service_reminder SET date_last_reminder='$today[mday]-$today[month]-$today[year]' WHERE id_system=(SELECT id FROM system WHERE serial_number='$newElement->idSystem')";
            }
            mysqli_query( $link , $query );
        }else{
            //update idComputer
            $query = "SELECT * FROM service_reminder WHERE id_computer = (SELECT id FROM computer WHERE service_tag='$newElement->idComputer')";
            if( mysqli_num_rows( mysqli_query( $link , $query ) ) <= 0 ){
                $query = "INSERT INTO service_reminder VALUES ( -1 , (SELECT id FROM computer WHERE service_tag='$newElement->idComputer') , '$today[mday]-$today[month]-$today[year]' )";
            }else{
                $query = "UPDATE service_reminder SET date_last_reminder='$today[mday]-$today[month]-$today[year]' WHERE id_computer=(SELECT id FROM computer WHERE service_tag='$newElement->idComputer')";
            }
            mysqli_query( $link , $query );
        }
        
    }
    
    //
    
    
    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new ServiceReminderModel( 
                $row[0],
                $row[1],
                $row[2]
                );
        return $newRow;
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            $newRow =   ServiceReminderService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
    
    //
    static function getDateAsDayMonthYear( $dateParam ){
        if( isset( $dateParam[2] ) ){
            $dateParam = explode( "-" , $dateParam );
            $dateParam = $dateParam[2] . "-" . $dateParam[1] . "-" . $dateParam[0];
        }else{
            $dateParam = "No Apply";
        }
        return $dateParam;
    }
    
    //
    static function getStatusByDaysUntilCalibrationDate( $dayParam ){
        $status = "OK";
        
        if( $dayParam < 60 ){
            $status = "CLOSE";
        }
        
        if( $dayParam <= 0 ){
            $status = "PAST";
        }
        
        return $status;
    }
    
    //
    static function getDaysUntilCalibrationDate( $dateParam ){
        $today = getdate();

        $date1 = new DateTime( $today[ 'year' ] . "-" . $today[ 'mon' ] . "-" . $today[ 'mday' ]   );
        $date2 = new DateTime( $dateParam );

        $diff = $date1->diff($date2);
        // will output 2 days

        return ($diff->invert == 1) ? ' - ' . $diff->days .''  : $diff->days .'';
    }
}