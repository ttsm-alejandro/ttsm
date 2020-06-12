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
class PersonService {
    //get all
    static function getAll( $link ){
        $query = " SELECT "
                    . " id, "
                    . " id_company, "
                    . " name, "
                    . " japanese_name, "
                    . " cellphone, "
                    . " email, "
                    . " comment "
                . "FROM"
                    . " person "
                . "ORDER BY "
                    . "name";
                
        $result = mysqli_query( $link , $query );
        return PersonService::getArrayByResult( $result );
    }
    
    //get by ID
    static function getById( $link , $id ){
        $query = " SELECT "
                    . " id, "
                    . " id_company, "
                    . " name, "
                    . " japanese_name, "
                    . " cellphone, "
                    . " email, "
                    . " comment "
                . " FROM "
                    . " person "
                . " WHERE "
                    . " id=$id";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        return PersonService::getElementByRow( $row );
    }
    
    //post new Element
    static function save( $link , $newElement ){
        $saveOrUpdate = "";
        if( $newElement->id == "--" ){
            $saveOrUpdate = "INSERT";
            $query = "INSERT INTO "
                        . " person ("
                            . " id_company, "
                            . " name, "
                            . " japanese_name, "
                            . " cellphone, "
                            . " email, "
                            . " comment "
                        . ")"
                    . " VALUES("
                        . "'$newElement->idCompany',"
                        . "'$newElement->name',"
                        . "'$newElement->japaneseName',"
                        . "'$newElement->cellphone',"
                        . "'$newElement->email',"
                        . "'$newElement->comment'"
                    . ")";
        }else{
            $saveOrUpdate = "UPDATE";
            $query = "UPDATE "
                        . " person "
                    . " SET "
                        . " id_company='$newElement->idCompany', "
                        . " name='$newElement->name', "
                        . " japanese_name='$newElement->japaneseName', "
                        . " cellphone='$newElement->cellphone', "
                        . " email='$newElement->email', "
                        . " comment='$newElement->comment' "
                    . " WHERE "
                        . "id=$newElement->id";
        }
        mysqli_query( $link , $query );
        
        $query = "SELECT id FROM person WHERE name='$newElement->name' AND id_company=$newElement->idCompany";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        
        return $saveOrUpdate . " " . $row[0];
    }
    
    //Delete Element
    static function delete( $link , $id ){
        $query = "DELETE FROM "
                    . " person "
                . " WHERE "
                    . "id=$id";
        mysqli_query( $link , $query );
        return "DELETE " . $id;
    }

    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new PersonModel( 
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
            $newRow = PersonService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}
