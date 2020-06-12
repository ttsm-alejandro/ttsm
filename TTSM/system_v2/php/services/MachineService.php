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
class MachineService {
    //get all
    static function getAll( $link ){
        $query = " SELECT "
                    . " id, "
                    . " id_system, "
                    . " id_machine_type, "
                    . " serial_number, "
                    . " id_computer, "
                    . " comment "
                . "FROM"
                    . " machine "
                . "ORDER BY "
                    . "serial_number";
                
        $result = mysqli_query( $link , $query );
        return MachineService::getArrayByResult( $result );
    }
    
    //get by ID
    static function getById( $link , $id ){
        $query = " SELECT "
                    . " id, "
                    . " id_system, "
                    . " id_machine_type, "
                    . " serial_number, "
                    . " id_computer, "
                    . " comment "
                . " FROM "
                    . " machine "
                . " WHERE "
                    . " id=$id";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        return MachineService::getElementByRow( $row );
    }
    
    //post new Element
    static function save( $link , $newElement ){
        $saveOrUpdate = "";
        if( $newElement->id == "--" ){
            $saveOrUpdate = "INSERT";
            $query = "INSERT INTO "
                        . " machine ("
                            . " id_system, "
                            . " id_machine_type, "
                            . " serial_number, "
                            . " id_computer, "
                            . " comment "
                        . ")"
                    . " VALUES("
                        . "$newElement->idSystem,"
                        . "$newElement->idMachineType,"
                        . "'$newElement->serialNumber',"
                        . "$newElement->idComputer,"
                        . "'$newElement->comment'"
                    . ")";
        }else{
            $saveOrUpdate = "UPDATE";
            $query = "UPDATE "
                        . " machine "
                    . " SET "
                        . " id_system=$newElement->idSystem, "
                        . " id_machine_type=$newElement->idMachineType, "
                        . " serial_number='$newElement->serialNumber', "
                        . " id_computer=$newElement->idComputer, "
                        . " comment='$newElement->comment' "
                    . " WHERE "
                        . "id=$newElement->id";
        }
        mysqli_query( $link , $query );

        $query = "SELECT id FROM machine WHERE serial_number='$newElement->serialNumber'";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        
        return $saveOrUpdate . " " . $row[0];
    }
    
    //Delete Element
    static function delete( $link , $id ){
        $query = "DELETE FROM "
                    . " machine "
                . " WHERE "
                    . "id=$id";
        mysqli_query( $link , $query );
        return "DELETE " . $id;
    }

    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new MachineModel( 
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                $row[4],
                $row[5]
                );
        return $newRow;
        
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            $newRow = MachineService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}