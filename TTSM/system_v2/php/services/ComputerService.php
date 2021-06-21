<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Description of personService:
 *          Service for the table "Person"
 *
 * @author alejandro aguayo
 */
class ComputerService {
    //get all
    static function getAll( $link ){
        $query = " SELECT "
                    . " id, "
                    . " service_tag, "
                    . " mac_address, "
                    . " detail, "
                    . " software_array, "
                    . " backup_array, "
                    . " comment "
                . "FROM"
                    . " computer "
                . "ORDER BY "
                    . "service_tag";
                
        $result = mysqli_query( $link , $query );
        return ComputerService::getArrayByResult( $result );
    }
    
    //get by ID
    static function getById( $link , $id ){
        $query = " SELECT "
                    . " id, "
                    . " service_tag, "
                    . " mac_address, "
                    . " detail, "
                    . " software_array, "
                    . " backup_array, "
                    . " comment "
                . " FROM "
                    . " computer "
                . " WHERE "
                    . " id=$id";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        return ComputerService::getElementByRow( $row );
    }
    
    //post new Element
    static function save( $link , $newElement ){
        $saveOrUpdate = "";
        if( $newElement->id == "--" ){
            $saveOrUpdate = "INSERT";
            $query = "INSERT INTO "
                        . " computer ("
                            . " service_tag, "
                            . " mac_address, "
                            . " detail, "
                            . " software_array, "
                            . " backup_array, "
                            . " comment "
                        . ")"
                    . " VALUES("
                        . "'$newElement->serviceTag',"
                        . "'$newElement->macAddress',"
                        . "'$newElement->detail',"
                        . "'$newElement->softwareArray',"
                        . "'$newElement->backupArray',"
                        . "'$newElement->comment'"
                    . ")";
        }else{
            $saveOrUpdate = "UPDATE";
            $query = "UPDATE "
                        . " computer "
                    . " SET "
                        . " service_tag='$newElement->serviceTag', "
                        . " mac_address='$newElement->macAddress', "
                        . " detail='$newElement->detail', "
                        . " software_array='$newElement->softwareArray', "
                        . " backup_array='$newElement->backupArray', "
                        . " comment='$newElement->comment' "
                    . " WHERE "
                        . "id=$newElement->id";
        }
        mysqli_query( $link , $query );
        //echo $query;
        
        $query = "SELECT id FROM computer WHERE service_tag='$newElement->serviceTag' and mac_address='$newElement->macAddress'";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        return $saveOrUpdate . " " . $row[0];
    }
    
    //Delete Element
    static function delete( $link , $id ){
        $query = "DELETE FROM "
                    . " computer "
                . " WHERE "
                    . "id=$id";
        mysqli_query( $link , $query );
        return "DELETE " . $id;
    }

    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new ComputerModel( 
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
            $newRow = ComputerService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}