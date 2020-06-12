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
class DepartmentService {
    //get all
    static function getAll( $link ){
        $query = " SELECT "
                    . " id, "
                    . " (SELECT id_company FROM plant WHERE id=id_plant) as id_company, "
                    . " id_plant, "
                    . " id_person, "
                    . " name, "
                    . " comment "
                . "FROM"
                    . " department "
                . "ORDER BY "
                    . "name";
                
        $result = mysqli_query( $link , $query );
        return DepartmentService::getArrayByResult( $result );
    }
    
    //get by ID
    static function getById( $link , $id ){
        $query = " SELECT "
                    . " id, "
                    . " (SELECT id_company FROM plant WHERE id=id_plant) as id_company, "
                    . " id_plant, "
                    . " id_person, "
                    . " name, "
                    . " comment "
                . " FROM "
                    . " department "
                . " WHERE "
                    . " id=$id";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        return DepartmentService::getElementByRow( $row );
    }
    
    //post new Element
    static function save( $link , $newElement ){
        $saveOrUpdate = "";
        if( $newElement->id == "--" ){
            $saveOrUpdate = "INSERT";
            $query = "INSERT INTO "
                        . " department ("
                            . " id_plant, "
                            . " id_person, "
                            . " name, "
                            . " comment "
                        . ")"
                    . " VALUES("
                        . "$newElement->idPlant,"
                        . "$newElement->idPerson,"
                        . "'$newElement->name',"
                        . "'$newElement->comment'"
                    . ")";
        }else{
            $saveOrUpdate = "UPDATE";
            $query = "UPDATE "
                        . " department "
                    . " SET "
                        . " id_plant=$newElement->idPlant, "
                        . " id_person=$newElement->idPerson, "
                        . " name='$newElement->name', "
                        . " comment='$newElement->comment' "
                    . " WHERE "
                        . "id=$newElement->id";
        }
        mysqli_query( $link , $query );
        
        $query = "SELECT id FROM department WHERE name='$newElement->name' and id_plant=$newElement->idPlant";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        
        return $saveOrUpdate . " " . $row[0];
    }
    
    //Delete Element
    static function delete( $link , $id ){
        $query = "DELETE FROM "
                    . " department "
                . " WHERE "
                    . "id=$id";
        mysqli_query( $link , $query );
        return "DELETE " . $id;
    }

    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new DepartmentModel( 
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
            $newRow = DepartmentService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}