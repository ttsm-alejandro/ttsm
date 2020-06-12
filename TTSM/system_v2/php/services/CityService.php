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
class CityService {
    //get all
    static function getAll( $link ){
        $query = " SELECT "
                    . " id, "
                    . " id_state, "
                    . " name "
                . "FROM"
                    . " city "
                . "ORDER BY "
                    . "name";
                
        $result = mysqli_query( $link , $query );
        return CityService::getArrayByResult( $result );
    }
    
    //get by ID
    static function getById( $link , $id ){
        $query = " SELECT "
                    . " id, "
                    . " id_state, "
                    . " name "
                . " FROM "
                    . " city "
                . " WHERE "
                    . " id=$id";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        return CityService::getElementByRow( $row );
    }
    
    //post new Element
    static function save( $link , $newElement ){
        $saveOrUpdate = "";
        if( $newElement->id == "--" ){
            $saveOrUpdate = "INSERT";
            $query = "INSERT INTO "
                        . " city ("
                            . " id_state, "
                            . " name "
                        . ")"
                    . " VALUES("
                        . "$newElement->idState,"
                        . "'$newElement->name'"
                    . ")";
        }else{
            $saveOrUpdate = "UPDATE";
            $query = "UPDATE "
                        . " city "
                    . " SET "
                        . " id_state=$newElement->idState, "
                        . " name='$newElement->name' "
                    . " WHERE "
                        . "id=$newElement->id";
        }
        mysqli_query( $link , $query );
        
        $query = "SELECT id FROM city WHERE name='$newElement->name' and id_state=$newElement->idState";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        
        return $saveOrUpdate . " " . $row[0];
    }
    
    //Delete Element
    static function delete( $link , $id ){
        $query = "DELETE FROM "
                    . " city "
                . " WHERE "
                    . "id=$id";
        mysqli_query( $link , $query );
        return "DELETE " . $id;
    }

    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new CityModel( 
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
            $newRow = CityService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}