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
class PlantService {
    //get all
    static function getAll( $link ){
        $query = " SELECT "
                    . " id, "
                    . " id_company, "
                    . " id_state, "
                    . " id_city, "
                    . " id_person, "
                    . " name, "
                    . " address, "
                    . " comment "
                . "FROM"
                    . " plant "
                . "ORDER BY "
                    . "name";
                
        $result = mysqli_query( $link , $query );
        return PlantService::getArrayByResult( $result );
    }
    
    //get by ID
    static function getById( $link , $id ){
        $query = " SELECT "
                    . " id, "
                    . " id_company, "
                    . " id_state, "
                    . " id_city, "
                    . " id_person, "
                    . " name, "
                    . " address, "
                    . " comment "
                . " FROM "
                    . " plant "
                . " WHERE "
                    . " id=$id";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        return PlantService::getElementByRow( $row );
    }
    
    //post new Element
    static function save( $link , $newElement ){
        $saveOrUpdate = "";
        if( $newElement->id == "--" ){
            $saveOrUpdate = "INSERT";
            $query = "INSERT INTO "
                        . " plant ("
                            . " id_company, "
                            . " id_state, "
                            . " id_city, "
                            . " id_person, "
                            . " name, "
                            . " address, "
                            . " comment "
                        . ")"
                    . " VALUES("
                        . "$newElement->idCompany,"
                        . "$newElement->idState,"
                        . "$newElement->idCity,"
                        . "$newElement->idPerson,"
                        . "'$newElement->name',"
                        . "'$newElement->address',"
                        . "'$newElement->comment'"
                    . ")";
        }else{
            $saveOrUpdate = "UPDATE";
            $query = "UPDATE "
                        . " plant "
                    . " SET "
                        . " id_company=$newElement->idCompany, "
                        . " id_state=$newElement->idState, "
                        . " id_city=$newElement->idCity, "
                        . " id_person=$newElement->idPerson, "
                        . " name='$newElement->name', "
                        . " address='$newElement->address', "
                        . " comment='$newElement->comment' "
                    . " WHERE "
                        . "id=$newElement->id";
        }
        mysqli_query( $link , $query );
        
        $query = "SELECT id FROM plant WHERE name='$newElement->name' and id_company=$newElement->idCompany";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        
        return $saveOrUpdate . " " . $row[0];
    }
    
    //Delete Element
    static function delete( $link , $id ){
        $query = "DELETE FROM "
                    . " plant "
                . " WHERE "
                    . "id=$id";
        mysqli_query( $link , $query );
        return "DELETE " . $id;
    }

    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new PlantModel( 
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                $row[4],
                $row[5],
                $row[6],
                $row[7]
                );
        return $newRow;
        
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            $newRow = PlantService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}