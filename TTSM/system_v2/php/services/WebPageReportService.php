<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Description of personService:
 *          Service for the table "webinar" from
 *
 * @author alejandro aguayo
 */
class WebPageReportService {
    //get all
    static function getAll( $link , $table ){
        $query = "SELECT "
                    . "id, "
                    . "name, "
                    . "company, "
                    . "email, "
                    . "phone, "
                    . "comment, "
                    . "date "
                . "FROM "
                    . $table
                . " ORDER BY date";
        $result = mysqli_query( $link , $query );
        return WebPageReportService::getArrayByResult( $result );
    }
    
    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new WebPageReportModel( 
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                $row[4],
                $row[5],
                $row[6]
                );
        return $newRow;
        
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            $newRow = WebPageReportService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}