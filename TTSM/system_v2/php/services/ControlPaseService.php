<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Description of personService:
 *          Service for the table "control_pase"
 *
 * @author alejandro aguayo
 */
class ControlPaseService {
    //get all
    static function getAll( $link ){
        $query = " SELECT "
                    . " id, "
                    . " date, "
                    . " destiny, "
                    . " user, "
                    . " amount "
                . "FROM"
                    . " control_pase "
                . "ORDER BY "
                    . "id DESC";
                
        $result = mysqli_query( $link , $query );
        return ControlPaseService::getArrayByResult( $result );
    }
    
    //post new Element
    static function save( $link , $newElement ){
        $saveOrUpdate = "";
        if( $newElement->id == "--" ){
            $saveOrUpdate = "INSERT";
            $query = "INSERT INTO "
                        . " control_pase ("
                            . " date, "
                            . " destiny, "
                            . " user, "
                            . " amount "
                        . ")"
                    . " VALUES("
                        . "'$newElement->date',"
                        . "'$newElement->destiny',"
                        . "'$newElement->user',"
                        . "$newElement->amount"
                    . ")";
        }else{
            $saveOrUpdate = "UPDATE";
            $query = "UPDATE "
                        . " control_pase "
                    . " SET "
                        . " date='$newElement->date', "
                        . " destiny='$newElement->destiny', "
                        . " user='$newElement->user', "
                        . " amount=$newElement->amount "
                    . " WHERE "
                        . "id=$newElement->id";
        }
        mysqli_query( $link , $query );
        
        $query = "SELECT id FROM control_pase WHERE date='$newElement->date' and destiny='$newElement->destiny' and user='$newElement->user'";
        //echo $query;
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        
        return $saveOrUpdate . " " . $row[0];
    }
    
    //Delete Element
    static function delete( $link , $id ){
        $query = "DELETE FROM "
                    . " control_pase "
                . " WHERE "
                    . "id=$id";
        mysqli_query( $link , $query );
        return "DELETE " . $id;
    }

    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new ControlPaseModel( 
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                $row[4]
                );
        return $newRow;
        
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            $newRow = ControlPaseService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}