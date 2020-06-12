<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Description of CompanyService:
 *          Service for the table "Company"
 *
 * @author alejandro aguayo
 */
class CompanyService {
    //get all
    static function getAll( $link ){
        $query = " SELECT "
                    . " id, "
                    . " full_name, "
                    . " short_name, "
                    . " web_page "
                . "FROM"
                    . " company "
                . "ORDER BY "
                    . "full_name" ;
        $result = mysqli_query( $link , $query );
        return CompanyService::getArrayByResult( $result );
    }
    
    //get by ID
    static function getById( $link , $id ){
        $query = " SELECT "
                    . " id, "
                    . " full_name, "
                    . " short_name, "
                    . " web_page "
                . " FROM "
                    . " company "
                . " WHERE "
                    . " id=$id";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        return CompanyService::getElementByRow( $row );
    }
    
    //post new Element
    static function save( $link , $newElement ){
        $saveOrUpdate = "";
        if( $newElement->id == "--" ){
            $saveOrUpdate = "INSERT";
            $query = "INSERT INTO "
                        . " company (full_name,short_name,web_page) "
                    . " VALUES("
                        . "'$newElement->fullName',"
                        . "'$newElement->shortName',"
                        . "'$newElement->webPage'"
                    . ")";
        }else{
            $saveOrUpdate = "UPDATE";
            $query = "UPDATE "
                        . " company "
                    . " SET "
                        . " full_name='$newElement->fullName', "
                        . " short_name='$newElement->shortName', "
                        . " web_page='$newElement->webPage' "
                    . " WHERE "
                        . "id=$newElement->id";
        }
        mysqli_query( $link , $query );

        $query = "SELECT id FROM company WHERE full_name='$newElement->fullName'";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        
        return $saveOrUpdate . " " . $row[0];
    }
    
    //Delete Element
    static function delete( $link , $id ){
        $query = "DELETE FROM "
                    . " company "
                . " WHERE "
                    . "id=$id";
        mysqli_query( $link , $query );
        return "DELETE " . $id;
    }

    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new CompanyModel( 
                $row[0],
                $row[1],
                $row[2],
                $row[3]
                );
        return $newRow;
        
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            $newRow = CompanyService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}
