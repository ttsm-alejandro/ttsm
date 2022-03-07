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
class CalibrationPlannerService {
    //get all
    static function getAll( $link , $daysCount = 60 ){
        $query = " SELECT "
                    . " company.short_name, "
                    . " plant.name, "
                    . " person.name, "
                    . " person.email, "
                    . " system.serial_number, "
                    . " concat( machine_type.name, ' <> ' , machine.serial_number ),"
                    . " system.next_calibration_date "
                . " FROM "
                    . " system, "
                    . " machine, "
                    . " machine_type, "
                    . " plant, "
                    . " department, "
                    . " person, "
                    . " company "
                . " WHERE "
                    . " company.id = system.id_company "
                    . " AND plant.id = system.id_plant "
                    . " AND department.id = system.id_department "
                    . " AND person.id = department.id_person "
                    . " AND machine.id_system = system.id "
                    . " AND machine_type.id = machine.id_machine_type " 
                . " ORDER BY "
                    . " system.serial_number ";
                
        //echo $query."<br>";
        $result = mysqli_query( $link , $query );
        return CalibrationPlannerService::getArrayByResult( $result , $daysCount );
    }
    
    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new CalibrationPlannerModel( 
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                $row[4],
                $row[5],
                $row[6],
                $row[7],
                $row[8]
                );
        return $newRow;
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result , $daysCount = 60 ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            
            //convert 2020-01-18T05:00:00.000Z	into 2020-01-18
            $row[6] = explode( "T" , $row[6] );
            $row[6] = $row[6][0];
            
            //get days until next calibration
            $row[7] = CalibrationPlannerService::getDaysUntilCalibrationDate( $row[6] );
            
            //after getting "days until next calibration date, convert 2020-01-18 into 18-01-2020
            $row[6] = CalibrationPlannerService::getDateAsDayMonthYear( $row[6] );
            
            //get Status OK/Close/Past by Days until next calibration
            $row[8] = CalibrationPlannerService::getStatusByDaysUntilCalibrationDate( $row[7] , $daysCount );
            
            //
            $newRow = CalibrationPlannerService::getElementByRow( $row );
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
    static function getStatusByDaysUntilCalibrationDate( $dayParam , $dayCount = 60 ){
        $status = "OK";
        
        if( $dayParam < $dayCount ){
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